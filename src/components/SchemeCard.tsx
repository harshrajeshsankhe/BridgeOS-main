import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, Volume2, BookmarkPlus, Bookmark, Clock, FileCheck, CheckCircle2, BarChart3 } from "lucide-react";
import type { Scheme } from "@/data/schemes";
import { getMatchConfidence, getWhyYouQualify } from "@/data/schemes";
import EligibilityBadge from "./EligibilityBadge";
import { useUserStore } from "@/stores/userStore";

const langMap: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
  ta: "ta-IN",
  te: "te-IN",
  bn: "bn-IN",
};

const difficultyColors: Record<string, string> = {
  easy: "bg-secondary/15 text-secondary",
  medium: "bg-accent/30 text-accent-foreground",
  documents_required: "bg-destructive/15 text-destructive",
};

const SchemeCard = ({
  scheme,
  eligibility = "eligible",
  showCompareCheckbox = false,
  isCompareSelected = false,
  onCompareToggle,
}: {
  scheme: Scheme;
  eligibility?: "eligible" | "partial" | "not_eligible";
  showCompareCheckbox?: boolean;
  isCompareSelected?: boolean;
  onCompareToggle?: (id: string) => void;
}) => {
  const { t, i18n } = useTranslation();
  const language = useUserStore((s) => s.language);
  const profile = useUserStore((s) => s.profile);
  const savedSchemes = useUserStore((s) => s.savedSchemes);
  const toggleSaveScheme = useUserStore((s) => s.toggleSaveScheme);
  const setSchemeStatus = useUserStore((s) => s.setSchemeStatus);
  const appliedSchemes = useUserStore((s) => s.appliedSchemes);
  const isHi = i18n.language !== "en";
  const [showDocs, setShowDocs] = useState(false);

  const isSaved = savedSchemes.includes(scheme.id);
  const appStatus = appliedSchemes.find((a) => a.schemeId === scheme.id);
  const confidence = getMatchConfidence(scheme, profile);
  const whyReasons = getWhyYouQualify(scheme, profile, i18n.language === "hi");

  const readAloud = () => {
    const text = i18n.language === "hi"
      ? `${scheme.nameHi}. ${scheme.benefitHi}`
      : `${scheme.name}. ${scheme.benefit}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[language] || "en-IN";
    speechSynthesis.speak(utterance);
  };

  const diffKey = scheme.difficulty === "easy" ? "difficulty_easy" : scheme.difficulty === "medium" ? "difficulty_medium" : "difficulty_documents";

  return (
    <div className="group flex flex-col rounded-xl border bg-card p-5 shadow-soft transition-all hover:shadow-warm">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-card-foreground leading-tight">
            {i18n.language === "hi" ? scheme.nameHi : scheme.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{scheme.ministry}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <EligibilityBadge level={eligibility} />
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${difficultyColors[scheme.difficulty]}`}>
            {t(diffKey)}
          </span>
        </div>
      </div>

      {/* Confidence */}
      {profile.onboarded && (
        <div className="mb-3 flex items-center gap-2">
          <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
          <div className="flex-1 rounded-full bg-muted h-2">
            <div
              className="h-2 rounded-full bg-secondary transition-all"
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{t("confidence_score", { score: confidence })}</span>
        </div>
      )}

      <p className="mb-3 flex-1 text-sm text-card-foreground/80">
        {i18n.language === "hi" ? scheme.benefitHi : scheme.benefit}
      </p>

      {/* Deadline */}
      {scheme.deadlineDays && (
        <div className="mb-3 flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-destructive" />
          <span className={`text-xs font-semibold ${scheme.deadlineDays <= 15 ? "text-destructive" : "text-muted-foreground"}`}>
            {t("closes_in_days", { days: scheme.deadlineDays })}
          </span>
        </div>
      )}

      {/* Eligibility tags */}
      <div className="mb-3 flex flex-wrap gap-1">
        {(i18n.language === "hi" ? scheme.eligibilityHi : scheme.eligibility).map((e, i) => (
          <span key={i} className="rounded-md bg-saffron-light px-2 py-0.5 text-xs font-medium text-primary">
            {e}
          </span>
        ))}
      </div>

      {/* Why you qualify */}
      {whyReasons.length > 0 && profile.onboarded && (
        <div className="mb-3 rounded-lg bg-forest-light p-3">
          <p className="text-xs font-semibold text-secondary mb-1">{t("why_you_qualify")}</p>
          <ul className="space-y-0.5">
            {whyReasons.map((r, i) => (
              <li key={i} className="flex items-center gap-1.5 text-xs text-card-foreground">
                <CheckCircle2 className="h-3 w-3 text-secondary flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Documents */}
      {showDocs && (
        <div className="mb-3 rounded-lg border bg-muted/50 p-3">
          <p className="text-xs font-semibold text-foreground mb-1">{t("required_documents")}</p>
          <ul className="space-y-1">
            {(i18n.language === "hi" ? scheme.documentsHi : scheme.documents).map((d, i) => (
              <li key={i} className="flex items-center gap-1.5 text-xs text-card-foreground">
                <FileCheck className="h-3 w-3 text-primary flex-shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Application status */}
      {appStatus && (
        <div className="mb-3 rounded-lg bg-saffron-light p-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {["applied", "under_review", "approved"].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full min-w-[40px] ${
                    (s === "applied") ||
                    (s === "under_review" && (appStatus.status === "under_review" || appStatus.status === "approved")) ||
                    (s === "approved" && appStatus.status === "approved")
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-primary">{t(`status_${appStatus.status}`)}</span>
          </div>
        </div>
      )}

      {/* Compare checkbox */}
      {showCompareCheckbox && (
        <label className="mb-3 flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isCompareSelected}
            onChange={() => onCompareToggle?.(scheme.id)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          <span className="text-xs text-muted-foreground">{t("select_to_compare")}</span>
        </label>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <a
          href={scheme.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ExternalLink className="h-4 w-4" />
          {t("apply_now")}
        </a>
        <button
          onClick={() => setShowDocs(!showDocs)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label={t("check_documents")}
        >
          <FileCheck className="h-5 w-5" />
        </button>
        <button
          onClick={readAloud}
          className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-forest-light text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
          aria-label={t("read_aloud")}
        >
          <Volume2 className="h-5 w-5" />
        </button>
        <button
          onClick={() => toggleSaveScheme(scheme.id)}
          className={`inline-flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
            isSaved
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
          aria-label={isSaved ? t("saved") : t("save")}
        >
          {isSaved ? <Bookmark className="h-5 w-5" /> : <BookmarkPlus className="h-5 w-5" />}
        </button>
      </div>

      {/* Mark applied */}
      {!appStatus && (
        <button
          onClick={() =>
            setSchemeStatus({
              schemeId: scheme.id,
              status: "applied",
              appliedDate: new Date().toISOString(),
            })
          }
          className="mt-2 h-10 w-full rounded-lg border text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          {t("mark_applied")}
        </button>
      )}
    </div>
  );
};

export default SchemeCard;
