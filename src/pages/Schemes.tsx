import { useState } from "react";
import { useTranslation } from "react-i18next";
import { schemes } from "@/data/schemes";
import SchemeCard from "@/components/SchemeCard";
import VoiceInput from "@/components/VoiceInput";
import { Search, X } from "lucide-react";
import type { Scheme } from "@/data/schemes";

const categories = ["All", "Housing", "Welfare", "Pension", "Skills", "Health", "Agriculture", "Savings", "Employment"];

const SchemesPage = () => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const filtered = schemes.filter((s) => {
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.nameHi.includes(search);
    const matchCat = category === "All" || s.category === category;
    return matchSearch && matchCat;
  });

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 2 ? [...prev, id] : prev
    );
  };

  const compareSchemes = compareIds.map((id) => schemes.find((s) => s.id === id)!).filter(Boolean);

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        <h1 className="mb-6 text-3xl font-bold text-foreground">{t("schemes")}</h1>

        {/* Search */}
        <div className="mb-6 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-14 w-full rounded-xl border bg-card pl-12 pr-4 text-base text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder={t("search_schemes")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <VoiceInput onResult={setSearch} />
        </div>

        {/* Categories */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`whitespace-nowrap rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${
                category === c
                  ? "gradient-saffron text-primary-foreground"
                  : "border bg-card text-card-foreground hover:bg-muted"
              }`}
            >
              {c === "All" ? t("all") : c}
            </button>
          ))}
        </div>

        {/* Compare bar */}
        {compareIds.length > 0 && (
          <div className="mb-6 flex items-center justify-between rounded-xl border bg-card p-4">
            <span className="text-sm font-medium text-card-foreground">
              {compareIds.length}/2 {t("select_to_compare")}
            </span>
            <div className="flex gap-2">
              {compareIds.length === 2 && (
                <button
                  onClick={() => setShowCompare(true)}
                  className="h-12 rounded-xl gradient-saffron px-6 font-semibold text-primary-foreground"
                >
                  {t("compare_schemes")}
                </button>
              )}
              <button
                onClick={() => setCompareIds([])}
                className="h-12 rounded-xl border bg-muted px-4 text-sm font-medium text-muted-foreground"
              >
                {t("close")}
              </button>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <SchemeCard
              key={s.id}
              scheme={s}
              showCompareCheckbox
              isCompareSelected={compareIds.includes(s.id)}
              onCompareToggle={toggleCompare}
            />
          ))}
        </div>
      </div>

      {/* Comparison Modal */}
      {showCompare && compareSchemes.length === 2 && (
        <CompareModal schemes={compareSchemes} onClose={() => { setShowCompare(false); setCompareIds([]); }} />
      )}
    </main>
  );
};

const CompareModal = ({ schemes: cs, onClose }: { schemes: Scheme[]; onClose: () => void }) => {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === "hi";

  const rows = [
    { label: "Ministry", get: (s: Scheme) => s.ministry },
    { label: t("benefit_total"), get: (s: Scheme) => `₹${s.estimatedBenefitValue.toLocaleString("en-IN")}` },
    { label: t("difficulty_easy"), get: (s: Scheme) => t(s.difficulty === "easy" ? "difficulty_easy" : s.difficulty === "medium" ? "difficulty_medium" : "difficulty_documents") },
    { label: t("closes_in_days", { days: "" }), get: (s: Scheme) => s.deadlineDays ? `${s.deadlineDays} days` : "N/A" },
    { label: t("required_documents"), get: (s: Scheme) => (isHi ? s.documentsHi : s.documents).join(", ") },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-xl bg-card p-6 shadow-warm" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-card-foreground">{t("compare_schemes")}</h2>
          <button onClick={onClose} className="h-10 w-10 rounded-lg bg-muted text-muted-foreground hover:bg-accent">
            <X className="h-5 w-5 mx-auto" />
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="pb-3 text-left text-muted-foreground font-medium" />
              {cs.map((s) => (
                <th key={s.id} className="pb-3 text-left font-bold text-card-foreground">
                  {isHi ? s.nameHi : s.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="py-3 pr-4 font-medium text-muted-foreground">{r.label}</td>
                {cs.map((s) => (
                  <td key={s.id} className="py-3 text-card-foreground">{r.get(s)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchemesPage;
