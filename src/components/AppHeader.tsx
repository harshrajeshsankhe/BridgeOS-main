import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useUserStore } from "@/stores/userStore";
import { Menu, X, Eye, Type } from "lucide-react";
import { useState } from "react";

const AppHeader = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const highContrast = useUserStore((s) => s.highContrast);
  const extraLargeText = useUserStore((s) => s.extraLargeText);
  const setHighContrast = useUserStore((s) => s.setHighContrast);
  const setExtraLargeText = useUserStore((s) => s.setExtraLargeText);

  const links = [
    { to: "/", label: t("home") },
    { to: "/dashboard", label: t("dashboard") },
    { to: "/schemes", label: t("schemes") },
    { to: "/discover", label: t("discover") },
    { to: "/jobs", label: t("jobs") },
    { to: "/rights", label: t("rights") },
    { to: "/civic", label: t("civic") },
    { to: "/action-plan", label: t("action_plan") },
    { to: "/transparency", label: t("transparency") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-saffron">
            <span className="text-lg font-black text-primary-foreground">B</span>
          </div>
          <span className="text-xl font-bold text-foreground">
            Bridge<span className="text-primary">OS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Accessibility toggles */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
              highContrast ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
            aria-label={t("high_contrast")}
            title={t("high_contrast")}
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => setExtraLargeText(!extraLargeText)}
            className={`hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
              extraLargeText ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
            aria-label={t("extra_large_text")}
            title={t("extra_large_text")}
          >
            <Type className="h-4 w-4" />
          </button>
          <LanguageSwitcher />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t bg-card p-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`rounded-md px-4 py-3 text-base font-medium transition-colors ${
                  location.pathname === l.to
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {l.label}
              </Link>
            ))}
            {/* Mobile accessibility toggles */}
            <div className="mt-2 flex gap-2 border-t pt-3">
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`flex-1 rounded-md px-4 py-3 text-sm font-medium ${
                  highContrast ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                }`}
              >
                <Eye className="mr-1 inline h-4 w-4" />{t("high_contrast")}
              </button>
              <button
                onClick={() => setExtraLargeText(!extraLargeText)}
                className={`flex-1 rounded-md px-4 py-3 text-sm font-medium ${
                  extraLargeText ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                }`}
              >
                <Type className="mr-1 inline h-4 w-4" />{t("extra_large_text")}
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default AppHeader;
