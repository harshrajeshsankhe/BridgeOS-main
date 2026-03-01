import { useTranslation } from "react-i18next";
import { useUserStore } from "@/stores/userStore";
import { matchSchemes } from "@/data/schemes";
import { Printer, CheckCircle2, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const ActionPlan = () => {
  const { t, i18n } = useTranslation();
  const profile = useUserStore((s) => s.profile);
  const isHi = i18n.language === "hi";

  const matched = profile.onboarded
    ? matchSchemes({
        income: profile.income,
        bpl: profile.bpl,
        occupation: profile.occupation,
        categories: profile.categories,
        state: profile.state,
      })
    : [];

  const handlePrint = () => window.print();

  return (
    <main className="min-h-screen bg-background print:bg-white">
      <div className="container max-w-2xl py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">{t("your_action_plan")}</h1>
          <button
            onClick={handlePrint}
            className="inline-flex h-12 items-center gap-2 rounded-xl gradient-saffron px-5 font-semibold text-primary-foreground print:hidden"
          >
            <Printer className="h-5 w-5" />
            {t("print")}
          </button>
        </div>

        {/* Profile summary */}
        <div className="mb-8 rounded-xl border bg-card p-5 print:border-gray-300">
          <h2 className="font-bold text-card-foreground mb-2">{profile.name || "Citizen"}</h2>
          <p className="text-sm text-muted-foreground">
            {profile.district}, {profile.state} &middot; {profile.occupation} &middot; {isHi ? "आय" : "Income"}: ₹{profile.income}/mo
          </p>
          {profile.categories.length > 0 && (
            <div className="mt-2 flex gap-1">
              {profile.categories.map((c) => (
                <span key={c} className="rounded-md bg-saffron-light px-2 py-0.5 text-xs font-medium text-primary">{c}</span>
              ))}
            </div>
          )}
        </div>

        {/* Steps */}
        {matched.length === 0 ? (
          <p className="text-muted-foreground text-center py-10">{t("no_matches")}</p>
        ) : (
          <div className="space-y-6">
            {matched.map((scheme, idx) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-xl border bg-card p-5 print:break-inside-avoid"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full gradient-saffron text-primary-foreground text-sm font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-card-foreground">{isHi ? scheme.nameHi : scheme.name}</h3>
                    <p className="text-xs text-muted-foreground">{scheme.ministry}</p>
                  </div>
                </div>

                <p className="text-sm text-card-foreground/80 mb-3">
                  <CheckCircle2 className="mr-1 inline h-4 w-4 text-secondary" />
                  {isHi ? scheme.benefitHi : scheme.benefit}
                </p>

                <p className="text-sm font-semibold text-foreground mb-1">
                  {isHi ? "₹" : "Benefit: ₹"}{scheme.estimatedBenefitValue.toLocaleString("en-IN")}
                  {scheme.deadlineDays && (
                    <span className="ml-2 text-destructive font-normal">
                      {t("closes_in_days", { days: scheme.deadlineDays })}
                    </span>
                  )}
                </p>

                {/* Documents */}
                <div className="mt-3 rounded-lg bg-muted/50 p-3">
                  <p className="text-xs font-semibold text-foreground mb-1">{t("required_documents")}</p>
                  <ul className="space-y-1">
                    {(isHi ? scheme.documentsHi : scheme.documents).map((d, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-card-foreground">
                        <FileCheck className="h-3 w-3 text-primary flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={scheme.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex h-10 items-center gap-1 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground print:text-primary print:bg-transparent print:border"
                >
                  {t("apply_now")}
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ActionPlan;
