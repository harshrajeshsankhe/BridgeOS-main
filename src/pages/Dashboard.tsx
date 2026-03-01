import { useTranslation } from "react-i18next";
import { useUserStore } from "@/stores/userStore";
import { matchSchemes, schemes } from "@/data/schemes";
import SchemeCard from "@/components/SchemeCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Bell, ClipboardList, Volume2, TrendingUp, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const profile = useUserStore((s) => s.profile);
  const savedSchemes = useUserStore((s) => s.savedSchemes);
  const appliedSchemes = useUserStore((s) => s.appliedSchemes);
  const language = useUserStore((s) => s.language);

  const matched = profile.onboarded
    ? matchSchemes({
        income: profile.income,
        bpl: profile.bpl,
        occupation: profile.occupation,
        categories: profile.categories,
        state: profile.state,
      })
    : [];

  const saved = schemes.filter((s) => savedSchemes.includes(s.id));
  const applied = schemes.filter((s) => appliedSchemes.some((a) => a.schemeId === s.id));

  const totalBenefit = matched.reduce((sum, s) => sum + s.estimatedBenefitValue, 0);
  const urgentSchemes = matched.filter((s) => s.deadlineDays && s.deadlineDays <= 15);
  const newSchemes = schemes.slice(0, 3);

  const [tab, setTab] = useState<"matched" | "saved" | "applied">("matched");
  const [animatedBenefit, setAnimatedBenefit] = useState(0);

  useEffect(() => {
    if (totalBenefit === 0) return;
    let current = 0;
    const step = totalBenefit / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= totalBenefit) {
        setAnimatedBenefit(totalBenefit);
        clearInterval(timer);
      } else {
        setAnimatedBenefit(Math.round(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [totalBenefit]);

  const langMap: Record<string, string> = { en: "en-IN", hi: "hi-IN", mr: "mr-IN", ta: "ta-IN", te: "te-IN", bn: "bn-IN" };

  const readBenefits = () => {
    const isHi = i18n.language === "hi";
    const top3 = matched.slice(0, 3);
    const text = isHi
      ? `आपके कुल लाभ ${totalBenefit.toLocaleString("en-IN")} रुपये प्रति वर्ष हैं। ${top3.map((s) => s.nameHi).join(", ")}।`
      : `Your total benefits are ${totalBenefit.toLocaleString("en-IN")} rupees per year. Top schemes: ${top3.map((s) => s.name).join(", ")}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[language] || "en-IN";
    speechSynthesis.speak(utterance);
  };

  const tabSchemes = tab === "matched" ? matched : tab === "saved" ? saved : applied;

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            {t("greeting")}, {profile.name || "Citizen"}
          </h1>
          {profile.state && (
            <p className="mt-1 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {profile.district}, {profile.state}
            </p>
          )}
        </motion.div>

        {/* Benefit Value Banner */}
        {totalBenefit > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 rounded-xl gradient-saffron p-6 shadow-warm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-foreground/80">{t("benefit_total")}</p>
                <p className="text-3xl font-extrabold text-primary-foreground">
                  <TrendingUp className="mr-2 inline h-7 w-7" />
                  &#8377;{animatedBenefit.toLocaleString("en-IN")}
                  <span className="text-base font-medium">/{i18n.language === "hi" ? "वर्ष" : "year"}</span>
                </p>
              </div>
              <button
                onClick={readBenefits}
                className="inline-flex h-14 items-center gap-2 rounded-xl bg-primary-foreground/20 px-5 font-semibold text-primary-foreground backdrop-blur transition hover:bg-primary-foreground/30"
              >
                <Volume2 className="h-5 w-5" />
                {t("read_my_benefits")}
              </button>
            </div>
          </motion.div>
        )}

        {/* Urgent Deadline Alert */}
        {urgentSchemes.length > 0 && (
          <div className="mb-6 rounded-xl border-2 border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-destructive" />
              <span className="font-bold text-destructive">{t("deadline_urgent")}</span>
            </div>
            {urgentSchemes.map((s) => (
              <p key={s.id} className="text-sm text-card-foreground">
                {i18n.language === "hi" ? s.nameHi : s.name} — {t("closes_in_days", { days: s.deadlineDays })}
              </p>
            ))}
          </div>
        )}

        {/* District Insights */}
        {profile.district && (
          <div className="mb-6 rounded-xl bg-cream p-4">
            <h3 className="text-sm font-bold text-foreground mb-2">
              {t("top_schemes_district", { district: profile.district })}
            </h3>
            <div className="flex gap-2 overflow-x-auto">
              {matched.slice(0, 3).map((s) => (
                <span key={s.id} className="whitespace-nowrap rounded-lg bg-saffron-light px-3 py-1.5 text-xs font-medium text-primary">
                  {i18n.language === "hi" ? s.nameHi : s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tabs: Matched / Saved / Applied */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-4">
            {(["matched", "saved", "applied"] as const).map((t2) => (
              <button
                key={t2}
                onClick={() => setTab(t2)}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${
                  tab === t2
                    ? "gradient-saffron text-primary-foreground"
                    : "border bg-card text-card-foreground hover:bg-muted"
                }`}
              >
                {t(t2)} ({t2 === "matched" ? matched.length : t2 === "saved" ? saved.length : applied.length})
              </button>
            ))}
            <Link to="/schemes" className="ml-auto flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              {t("view_all")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {tabSchemes.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tabSchemes.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <SchemeCard scheme={s} eligibility={tab === "matched" ? "eligible" : "partial"} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border bg-card p-8 text-center">
              <p className="text-muted-foreground">{t("no_matches")}</p>
              <Link
                to="/onboarding"
                className="mt-4 inline-flex h-12 items-center rounded-lg gradient-saffron px-6 font-semibold text-primary-foreground"
              >
                {t("find_schemes")}
              </Link>
            </div>
          )}
        </section>

        {/* New This Week */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-foreground">{t("new_this_week")}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {newSchemes.map((s) => (
              <SchemeCard key={s.id} scheme={s} eligibility="partial" />
            ))}
          </div>
        </section>

        {/* Community Stories */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-foreground">{t("community_stories")}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "Savitri Devi", location: "Pune, Maharashtra", text: i18n.language === "hi" ? "विधवा पेंशन योजना से मुझे हर महीने मदद मिलती है।" : "The Widow Pension Scheme helps me every month." },
              { name: "Ramesh Patil", location: "Kolhapur, Maharashtra", text: i18n.language === "hi" ? "पीएम किसान निधि से मेरी खेती बेहतर हुई।" : "PM Kisan Nidhi improved my farming." },
              { name: "Lakshmi Bai", location: "Lucknow, UP", text: i18n.language === "hi" ? "आयुष्मान भारत ने मेरे ऑपरेशन का खर्च उठाया।" : "Ayushman Bharat covered my surgery cost." },
            ].map((story, i) => (
              <div key={i} className="rounded-xl border bg-card p-5 shadow-soft">
                <p className="text-sm text-card-foreground italic leading-relaxed">"{story.text}"</p>
                <p className="mt-3 text-sm font-bold text-foreground">{story.name}</p>
                <p className="text-xs text-muted-foreground">{story.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Access Grid */}
        <section className="grid gap-4 md:grid-cols-3">
          <Link to="/civic" className="flex items-center gap-4 rounded-xl border bg-card p-6 shadow-soft transition-all hover:shadow-warm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-saffron-light text-primary">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-card-foreground">{t("application_tracker")}</h3>
              <p className="text-sm text-muted-foreground">{appliedSchemes.length} active</p>
            </div>
          </Link>
          <Link to="/civic" className="flex items-center gap-4 rounded-xl border bg-card p-6 shadow-soft transition-all hover:shadow-warm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-light text-secondary">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-card-foreground">{t("nearby_services")}</h3>
              <p className="text-sm text-muted-foreground">5 nearby</p>
            </div>
          </Link>
          <Link to="/civic" className="flex items-center gap-4 rounded-xl border bg-card p-6 shadow-soft transition-all hover:shadow-warm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-light text-accent-foreground">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-card-foreground">{t("civic_alerts")}</h3>
              <p className="text-sm text-muted-foreground">2 new</p>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
