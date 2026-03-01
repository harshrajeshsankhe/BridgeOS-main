import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";
import VoiceInput from "@/components/VoiceInput";
import { motion, AnimatePresence } from "framer-motion";

const states = [
  "Andhra Pradesh", "Bihar", "Gujarat", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Rajasthan", "Tamil Nadu",
  "Uttar Pradesh", "West Bengal",
];

const Onboarding = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setProfile = useUserStore((s) => s.setProfile);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", state: "", district: "", age: "", gender: "",
    income: "", bpl: false, bankAccount: false,
    occupation: "", categories: [] as string[],
  });

  const set = (key: string, val: any) => setForm((f) => ({ ...f, [key]: val }));
  const toggleCat = (cat: string) =>
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));

  const handleSubmit = () => {
    setProfile({
      name: form.name,
      state: form.state,
      district: form.district,
      age: Number(form.age),
      gender: form.gender,
      income: Number(form.income),
      bpl: form.bpl,
      bankAccount: form.bankAccount,
      occupation: form.occupation,
      categories: form.categories,
      onboarded: true,
    });
    navigate("/dashboard");
  };

  const inputClass =
    "h-14 w-full rounded-xl border bg-card px-4 text-base text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const selectClass = inputClass;
  const toggleBtn = (active: boolean) =>
    `h-14 flex-1 rounded-xl border text-base font-semibold transition-colors ${
      active ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground hover:bg-muted"
    }`;
  const catBtn = (active: boolean) =>
    `h-12 rounded-xl border px-4 text-sm font-medium transition-colors ${
      active ? "bg-secondary text-secondary-foreground" : "bg-card text-card-foreground hover:bg-muted"
    }`;

  const steps = [
    // Step 1: Basic
    <div key={0} className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input className={inputClass} placeholder={t("name")} value={form.name} onChange={(e) => set("name", e.target.value)} />
        <VoiceInput onResult={(v) => set("name", v)} />
      </div>
      <select className={selectClass} value={form.state} onChange={(e) => set("state", e.target.value)}>
        <option value="">{t("state")}</option>
        {states.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <div className="flex items-center gap-2">
        <input className={inputClass} placeholder={t("district")} value={form.district} onChange={(e) => set("district", e.target.value)} />
        <VoiceInput onResult={(v) => set("district", v)} />
      </div>
      <input className={inputClass} type="number" placeholder={t("age")} value={form.age} onChange={(e) => set("age", e.target.value)} />
      <div className="flex gap-2">
        {["Male", "Female", "Other"].map((g) => (
          <button key={g} onClick={() => set("gender", g)} className={toggleBtn(form.gender === g)}>{t(g.toLowerCase())}</button>
        ))}
      </div>
    </div>,
    // Step 2: Income
    <div key={1} className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input className={inputClass} type="number" placeholder={t("monthly_income")} value={form.income} onChange={(e) => set("income", e.target.value)} />
        <VoiceInput onResult={(v) => set("income", v.replace(/[^\d]/g, ""))} />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">{t("bpl_card")}</label>
          <div className="flex gap-2">
            <button onClick={() => set("bpl", true)} className={toggleBtn(form.bpl)}>{t("yes")}</button>
            <button onClick={() => set("bpl", false)} className={toggleBtn(!form.bpl)}>{t("no")}</button>
          </div>
        </div>
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">{t("bank_account")}</label>
          <div className="flex gap-2">
            <button onClick={() => set("bankAccount", true)} className={toggleBtn(form.bankAccount)}>{t("yes")}</button>
            <button onClick={() => set("bankAccount", false)} className={toggleBtn(!form.bankAccount)}>{t("no")}</button>
          </div>
        </div>
      </div>
    </div>,
    // Step 3: Occupation
    <div key={2} className="flex flex-col gap-4">
      <label className="text-sm font-medium text-muted-foreground">{t("occupation")}</label>
      <div className="grid grid-cols-2 gap-3">
        {["Farmer", "Student", "Unemployed", "Daily Wage", "Self Employed"].map((o) => (
          <button key={o} onClick={() => set("occupation", o)} className={toggleBtn(form.occupation === o)}>
            {t(o.toLowerCase().replace(" ", "_"))}
          </button>
        ))}
      </div>
    </div>,
    // Step 4: Categories
    <div key={3} className="flex flex-col gap-4">
      <label className="text-sm font-medium text-muted-foreground">{t("special_categories")}</label>
      <div className="flex flex-wrap gap-3">
        {["Widow", "Disabled", "Minority", "Senior Citizen", "Pregnant"].map((c) => (
          <button key={c} onClick={() => toggleCat(c)} className={catBtn(form.categories.includes(c))}>
            {t(c.toLowerCase().replace(" ", "_"))}
          </button>
        ))}
      </div>
    </div>,
  ];

  return (
    <main className="min-h-screen bg-cream">
      <div className="container max-w-lg py-8">
        <h1 className="mb-6 text-2xl font-bold text-foreground">{t("onboarding")}</h1>

        {/* Progress */}
        <div className="mb-8 flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i <= step ? "gradient-saffron" : "bg-border"
              }`}
            />
          ))}
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          {t("step")} {step + 1} / 4
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="h-14 flex-1 rounded-xl border bg-card text-base font-semibold text-card-foreground hover:bg-muted"
            >
              {t("back")}
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="h-14 flex-1 rounded-xl gradient-saffron text-base font-bold text-primary-foreground shadow-warm transition-transform hover:scale-[1.02]"
            >
              {t("next")}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="h-14 flex-1 rounded-xl bg-secondary text-base font-bold text-secondary-foreground transition-transform hover:scale-[1.02]"
            >
              {t("submit")}
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Onboarding;
