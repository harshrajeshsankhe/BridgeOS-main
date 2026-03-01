import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Landmark, Briefcase, Scale } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const Landing = () => {
  const { t } = useTranslation();

  const features = [
    { icon: Landmark, title: t("govt_schemes"), desc: t("govt_schemes_desc"), color: "bg-saffron-light text-primary" },
    { icon: Briefcase, title: t("jobs_skills"), desc: t("jobs_skills_desc"), color: "bg-forest-light text-secondary" },
    { icon: Scale, title: t("legal_rights"), desc: t("legal_rights_desc"), color: "bg-gold-light text-accent-foreground" },
  ];

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <div className="container flex flex-col items-center gap-8 py-16 md:flex-row md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-4xl font-extrabold leading-tight text-foreground md:text-6xl">
              {t("hero_title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              {t("hero_subtitle")}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Link
                to="/onboarding"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl gradient-saffron px-8 text-lg font-bold text-primary-foreground shadow-warm transition-transform hover:scale-105"
              >
                <Landmark className="h-5 w-5" />
                {t("find_schemes")}
              </Link>
              <Link
                to="/discover"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-secondary px-8 text-lg font-bold text-secondary-foreground transition-transform hover:scale-105"
              >
                {t("talk_to_bridge")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1"
          >
            <img
              src={heroImage}
              alt="Indian citizens at a digital kiosk"
              className="w-full rounded-2xl shadow-warm"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="flex flex-col items-center rounded-xl border bg-card p-8 text-center shadow-soft transition-all hover:shadow-warm"
            >
              <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${f.color}`}>
                <f.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-cream py-8 text-center">
        <p className="text-sm text-muted-foreground">{t("footer_text")}</p>
        <p className="mt-2 text-xs text-muted-foreground/60">2026 BridgeOS - Universal Civic Access Platform</p>
      </footer>
    </main>
  );
};

export default Landing;
