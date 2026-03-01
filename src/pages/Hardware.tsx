import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { citizens } from "@/data/citizens";
import { matchSchemes } from "@/data/schemes";
import SchemeCard from "@/components/SchemeCard";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Wifi, WifiOff, Activity, User, Zap } from "lucide-react";

interface LogEntry {
  time: string;
  message: string;
  type: "nfc" | "mesh" | "kiosk";
}

const Hardware = () => {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === "hi";

  const [kioskStatus, setKioskStatus] = useState({
    uptime: "0h 0m",
    language: "en",
    lastSync: new Date().toLocaleTimeString(),
  });
  const [meshOnline, setMeshOnline] = useState(true);
  const [alertCount, setAlertCount] = useState(0);
  const [activeCitizen, setActiveCitizen] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Simulation
  useEffect(() => {
    let upMins = 0;
    const interval = setInterval(() => {
      upMins += 1;
      const hrs = Math.floor(upMins / 60);
      const mins = upMins % 60;

      // Random event
      const rand = Math.random();
      if (rand < 0.3) {
        // NFC tap
        const ids = Object.keys(citizens);
        const cid = ids[Math.floor(Math.random() * ids.length)];
        setActiveCitizen(cid);
        setLogs((l) => [
          { time: new Date().toLocaleTimeString(), message: `NFC tap: ${citizens[cid].name} (${cid})`, type: "nfc" },
          ...l.slice(0, 19),
        ]);
      } else if (rand < 0.5) {
        // Mesh alert
        setAlertCount((c) => c + 1);
        setMeshOnline(Math.random() > 0.15);
        setLogs((l) => [
          { time: new Date().toLocaleTimeString(), message: "Mesh: Vaccination camp tomorrow — Ward 5", type: "mesh" },
          ...l.slice(0, 19),
        ]);
      } else {
        // Kiosk status
        setKioskStatus({
          uptime: `${hrs}h ${mins}m`,
          language: i18n.language,
          lastSync: new Date().toLocaleTimeString(),
        });
        setLogs((l) => [
          { time: new Date().toLocaleTimeString(), message: `Kiosk sync complete`, type: "kiosk" },
          ...l.slice(0, 19),
        ]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [i18n.language]);

  const citizen = activeCitizen ? citizens[activeCitizen] : null;
  const matched = citizen
    ? matchSchemes({
        income: citizen.income,
        bpl: citizen.bpl,
        occupation: citizen.occupation,
        categories: citizen.categories,
        state: citizen.state,
      })
    : [];

  const typeColor: Record<string, string> = {
    nfc: "bg-saffron-light text-primary",
    mesh: "bg-forest-light text-secondary",
    kiosk: "bg-gold-light text-accent-foreground",
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">{t("hardware")}</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Kiosk Status */}
          <div className="rounded-xl border bg-card p-6 shadow-soft">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-saffron text-primary-foreground">
                <Cpu className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-card-foreground">{t("kiosk_status")}</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("uptime")}</span>
                <span className="font-semibold text-foreground">{kioskStatus.uptime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("language_mode")}</span>
                <span className="font-semibold text-foreground">{kioskStatus.language.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("last_sync")}</span>
                <span className="font-semibold text-foreground">{kioskStatus.lastSync}</span>
              </div>
            </div>
          </div>

          {/* Mesh Status */}
          <div className="rounded-xl border bg-card p-6 shadow-soft">
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${meshOnline ? "bg-secondary" : "bg-destructive"} text-secondary-foreground`}>
                {meshOnline ? <Wifi className="h-6 w-6" /> : <WifiOff className="h-6 w-6" />}
              </div>
              <h2 className="text-lg font-bold text-card-foreground">{t("mesh_nodes")}</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className={`font-semibold ${meshOnline ? "text-secondary" : "text-destructive"}`}>
                  {meshOnline ? "Online" : "Offline"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Alerts Sent</span>
                <span className="font-semibold text-foreground">{alertCount}</span>
              </div>
            </div>
          </div>

          {/* Citizen Loader */}
          <div className="rounded-xl border bg-card p-6 shadow-soft">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-light text-accent-foreground">
                <User className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-card-foreground">{t("citizen_loader")}</h2>
            </div>
            {citizen ? (
              <div className="space-y-2">
                <p className="font-bold text-foreground">{citizen.name}</p>
                <p className="text-sm text-muted-foreground">{citizen.district}, {citizen.state}</p>
                <p className="text-sm text-muted-foreground">₹{citizen.income}/mo · {citizen.occupation}</p>
                {citizen.categories.length > 0 && (
                  <div className="flex gap-1">
                    {citizen.categories.map((c) => (
                      <span key={c} className="rounded-md bg-saffron-light px-2 py-0.5 text-xs font-medium text-primary">{c}</span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {isHi ? "NFC टैप की प्रतीक्षा..." : "Waiting for NFC tap..."}
              </p>
            )}
          </div>
        </div>

        {/* Matched Schemes for loaded citizen */}
        {matched.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">
              {isHi ? `${citizen!.name} के लिए योजनाएं` : `Schemes for ${citizen!.name}`}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {matched.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <SchemeCard scheme={s} eligibility="eligible" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* Activity Log */}
        <section className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">{t("activity_log")}</h2>
          </div>
          <div className="space-y-2">
            {logs.length === 0 && (
              <p className="rounded-xl border bg-card p-4 text-center text-muted-foreground">
                {isHi ? "सिमुलेशन शुरू हो रहा है..." : "Simulation starting..."}
              </p>
            )}
            {logs.map((log, i) => (
              <motion.div
                key={`${log.time}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3"
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${typeColor[log.type]}`}>
                  <Zap className="h-4 w-4" />
                </span>
                <span className="text-xs text-muted-foreground">{log.time}</span>
                <span className="text-sm text-card-foreground">{log.message}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Hardware;
