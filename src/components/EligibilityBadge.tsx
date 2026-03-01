import { useTranslation } from "react-i18next";

type Level = "eligible" | "partial" | "not_eligible";

const styles: Record<Level, string> = {
  eligible: "bg-forest text-forest-foreground",
  partial: "bg-gold text-accent-foreground",
  not_eligible: "bg-muted text-muted-foreground",
};

// Fix: forest-foreground isn't defined, use white for eligible
const badgeStyles: Record<Level, string> = {
  eligible: "bg-secondary text-secondary-foreground",
  partial: "bg-accent text-accent-foreground",
  not_eligible: "bg-muted text-muted-foreground",
};

const EligibilityBadge = ({ level }: { level: Level }) => {
  const { t } = useTranslation();
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[level]}`}>
      {t(level)}
    </span>
  );
};

export default EligibilityBadge;
