import { useTranslation } from "react-i18next";
import { useUserStore } from "@/stores/userStore";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हि" },
  { code: "mr", label: "मरा" },
  { code: "ta", label: "த" },
  { code: "te", label: "తె" },
  { code: "bn", label: "বা" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const setLanguage = useUserStore((s) => s.setLanguage);

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    setLanguage(code);
    localStorage.setItem("bridgeos-lang", code);
  };

  return (
    <div className="flex items-center gap-0.5">
      <Globe className="mr-1 h-4 w-4 text-muted-foreground" />
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className={`rounded-md px-1.5 py-1 text-xs font-medium transition-colors ${
            i18n.language === lang.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
