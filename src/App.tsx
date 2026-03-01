import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/lib/i18n";
import AppHeader from "@/components/AppHeader";
import { useUserStore } from "@/stores/userStore";
import Landing from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import SchemesPage from "./pages/Schemes";
import Discover from "./pages/Discover";
import Jobs from "./pages/Jobs";
import Rights from "./pages/Rights";
import Civic from "./pages/Civic";
import Hardware from "./pages/Hardware";
import ActionPlan from "./pages/ActionPlan";
import Transparency from "./pages/Transparency";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppShell = () => {
  const highContrast = useUserStore((s) => s.highContrast);
  const extraLargeText = useUserStore((s) => s.extraLargeText);

  return (
    <div className={`${highContrast ? "high-contrast" : ""} ${extraLargeText ? "text-xl" : ""}`}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schemes" element={<SchemesPage />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/rights" element={<Rights />} />
        <Route path="/civic" element={<Civic />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/action-plan" element={<ActionPlan />} />
        <Route path="/transparency" element={<Transparency />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
