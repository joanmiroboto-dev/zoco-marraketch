import { BookOpen, ShoppingBag, BookText } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { path: "/", label: "Lecciones", icon: BookOpen },
  { path: "/souk", label: "Zoco", icon: ShoppingBag },
  { path: "/glossary", label: "Glosario", icon: BookText },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide nav on lesson/quiz screens
  if (location.pathname.startsWith("/lesson")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className={`w-6 h-6 ${active ? "stroke-[2.5]" : ""}`} />
              <span className="text-xs font-semibold font-display">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
