import { useTranslation } from "react-i18next";
import { Vote, Calendar, MessageSquare, FileText } from "lucide-react";
import { useState } from "react";

const Civic = () => {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === "hi";
  const [grievance, setGrievance] = useState("");

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">{t("civic")}</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Voter Status */}
          <div className="rounded-xl border bg-card p-6 shadow-soft">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-saffron-light text-primary">
                <Vote className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-card-foreground">
                {isHi ? "मतदाता स्थिति" : "Voter Status"}
              </h2>
            </div>
            <p className="text-muted-foreground">
              {isHi
                ? "अपनी मतदाता सूची में नाम जांचने के लिए EPIC नंबर दर्ज करें।"
                : "Enter your EPIC number to check your name in the voter list."}
            </p>
            <div className="mt-4 flex gap-2">
              <input
                className="h-14 flex-1 rounded-xl border bg-background px-4 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="EPIC Number"
              />
              <button className="h-14 rounded-xl bg-primary px-6 font-semibold text-primary-foreground">
                {isHi ? "जांचें" : "Check"}
              </button>
            </div>
          </div>

          {/* Upcoming Meetings */}
          <div className="rounded-xl border bg-card p-6 shadow-soft">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-light text-secondary">
                <Calendar className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-card-foreground">
                {isHi ? "आगामी बैठकें" : "Upcoming Meetings"}
              </h2>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg bg-muted p-3">
                <p className="font-semibold text-foreground">Gram Sabha Meeting</p>
                <p className="text-sm text-muted-foreground">15 March 2026 · Panchayat Bhavan</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="font-semibold text-foreground">Ward Committee</p>
                <p className="text-sm text-muted-foreground">22 March 2026 · Community Hall</p>
              </div>
            </div>
          </div>

          {/* Public Consultations */}
          <div className="rounded-xl border bg-card p-6 shadow-soft">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-light text-accent-foreground">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-card-foreground">
                {isHi ? "सार्वजनिक परामर्श" : "Public Consultations"}
              </h2>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg bg-muted p-3">
                <p className="font-semibold text-foreground">
                  {isHi ? "सड़क चौड़ीकरण परियोजना" : "Road Widening Project"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isHi ? "अपनी राय दें — 20 मार्च तक" : "Share your opinion — until March 20"}
                </p>
              </div>
            </div>
          </div>

          {/* Grievance Form */}
          <div className="rounded-xl border bg-card p-6 shadow-soft">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-saffron-light text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-card-foreground">
                {isHi ? "शिकायत दर्ज करें" : "File a Grievance"}
              </h2>
            </div>
            <textarea
              className="h-28 w-full rounded-xl border bg-background p-4 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder={isHi ? "अपनी शिकायत यहां लिखें..." : "Write your grievance here..."}
              value={grievance}
              onChange={(e) => setGrievance(e.target.value)}
            />
            <button className="mt-3 h-14 w-full rounded-xl gradient-saffron font-bold text-primary-foreground shadow-warm">
              {t("submit")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Civic;
