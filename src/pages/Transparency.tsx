import { useTranslation } from "react-i18next";
import { schemes } from "@/data/schemes";
import { Shield, ExternalLink } from "lucide-react";

const Transparency = () => {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === "hi";

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-2xl py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">{t("transparency")}</h1>

        {/* Privacy */}
        <section className="mb-8 rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-light text-secondary">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-card-foreground">{t("privacy_policy")}</h2>
          </div>
          <ul className="space-y-3 text-sm text-card-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
              {t("no_aadhaar_storage")}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
              {isHi ? "सभी डेटा आपके डिवाइस पर स्थानीय रूप से संग्रहित है।" : "All data is stored locally on your device."}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
              {isHi ? "कोई व्यक्तिगत जानकारी सर्वर पर नहीं भेजी जाती।" : "No personal information is sent to any server."}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
              {isHi ? "आप किसी भी समय अपना डेटा मिटा सकते हैं।" : "You can delete your data at any time."}
            </li>
          </ul>
        </section>

        {/* Official Links */}
        <section className="rounded-xl border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold text-card-foreground">{t("official_links")}</h2>
          <div className="space-y-3">
            {schemes.map((s) => (
              <a
                key={s.id}
                href={s.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border p-3 text-sm text-card-foreground hover:bg-muted transition-colors"
              >
                <span className="font-medium">{isHi ? s.nameHi : s.name}</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Transparency;
