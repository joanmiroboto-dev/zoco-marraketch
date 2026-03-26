import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useGameStore } from "@/store/gameStore";
import Onboarding from "@/components/Onboarding";
import BottomNav from "@/components/BottomNav";
import LessonMap from "@/pages/LessonMap";
import LessonView from "@/pages/LessonView";
import Souk from "@/pages/Souk";
import Glossary from "@/pages/Glossary";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

function AppContent() {
  const hasSeenOnboarding = useGameStore((s) => s.hasSeenOnboarding);

  if (!hasSeenOnboarding) return <Onboarding />;

  return (
    <>
      <Routes>
        <Route path="/" element={<LessonMap />} />
        <Route path="/lesson/:id" element={<LessonView />} />
        <Route path="/souk" element={<Souk />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
