import { useTranslation } from "react-i18next";
import { Shield, Users, Landmark, ShoppingBag, Accessibility } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const categories = [
  {
    id: "women",
    icon: Users,
    title: "Women's Rights",
    titleHi: "महिला अधिकार",
    rights: [
      { en: "Equal pay for equal work under the Equal Remuneration Act", hi: "समान पारिश्रमिक अधिनियम के तहत समान काम के लिए समान वेतन" },
      { en: "Protection from domestic violence under the DV Act 2005", hi: "DV अधिनियम 2005 के तहत घरेलू हिंसा से सुरक्षा" },
      { en: "Right to free legal aid", hi: "मुफ्त कानूनी सहायता का अधिकार" },
      { en: "Maternity leave of 26 weeks under Maternity Benefit Act", hi: "मातृत्व लाभ अधिनियम के तहत 26 सप्ताह का मातृत्व अवकाश" },
    ],
  },
  {
    id: "labor",
    icon: Shield,
    title: "Labor Rights",
    titleHi: "श्रम अधिकार",
    rights: [
      { en: "Minimum wages as per state notification", hi: "राज्य अधिसूचना के अनुसार न्यूनतम मजदूरी" },
      { en: "100 days guaranteed work under MGNREGA", hi: "मनरेगा के तहत 100 दिन का गारंटी रोजगार" },
      { en: "Workplace safety under Factories Act", hi: "फैक्ट्री अधिनियम के तहत कार्यस्थल सुरक्षा" },
    ],
  },
  {
    id: "land",
    icon: Landmark,
    title: "Land Rights",
    titleHi: "भूमि अधिकार",
    rights: [
      { en: "Right to fair compensation under Land Acquisition Act 2013", hi: "भूमि अधिग्रहण अधिनियम 2013 के तहत उचित मुआवजे का अधिकार" },
      { en: "Forest dwellers' rights under FRA 2006", hi: "FRA 2006 के तहत वनवासियों के अधिकार" },
    ],
  },
  {
    id: "consumer",
    icon: ShoppingBag,
    title: "Consumer Rights",
    titleHi: "उपभोक्ता अधिकार",
    rights: [
      { en: "Right to be protected against unfair trade practices", hi: "अनुचित व्यापार प्रथाओं से सुरक्षा का अधिकार" },
      { en: "Right to seek redressal at Consumer Forum", hi: "उपभोक्ता फोरम में निवारण का अधिकार" },
    ],
  },
  {
    id: "disability",
    icon: Accessibility,
    title: "Disability Rights",
    titleHi: "विकलांगता अधिकार",
    rights: [
      { en: "4% reservation in government jobs under RPwD Act 2016", hi: "RPwD अधिनियम 2016 के तहत सरकारी नौकरियों में 4% आरक्षण" },
      { en: "Free education up to 18 years", hi: "18 वर्ष तक मुफ्त शिक्षा" },
      { en: "Disability pension from state government", hi: "राज्य सरकार से विकलांगता पेंशन" },
    ],
  },
];

const Rights = () => {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === "hi";
  const [active, setActive] = useState("women");

  const current = categories.find((c) => c.id === active)!;

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">{t("legal_rights")}</h1>

        {/* Category pills */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${
                active === c.id
                  ? "bg-secondary text-secondary-foreground"
                  : "border bg-card text-card-foreground hover:bg-muted"
              }`}
            >
              <c.icon className="h-4 w-4" />
              {isHi ? c.titleHi : c.title}
            </button>
          ))}
        </div>

        {/* Rights list */}
        <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {current.rights.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 rounded-xl border bg-card p-5 shadow-soft"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-forest-light text-secondary font-bold text-sm">
                {i + 1}
              </div>
              <p className="text-base text-card-foreground leading-relaxed">{isHi ? r.hi : r.en}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Legal Aid */}
        <section className="mt-10 rounded-xl border bg-cream p-6">
          <h2 className="text-lg font-bold text-foreground">
            {isHi ? "अपने पास कानूनी सहायता खोजें" : "Find Legal Aid Near You"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {isHi
              ? "जिला कानूनी सेवा प्राधिकरण (DLSA) से संपर्क करें — टोल फ्री: 15100"
              : "Contact your District Legal Services Authority (DLSA) — Toll Free: 15100"}
          </p>
        </section>
      </div>
    </main>
  );
};

export default Rights;
