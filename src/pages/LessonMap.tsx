import { units } from "@/data/lessons";
import { useGameStore } from "@/store/gameStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, CheckCircle2, Gift } from "lucide-react";
import DirhamsBar from "@/components/DirhamsBar";

export default function LessonMap() {
  const completedUnits = useGameStore((s) => s.completedUnits);
  const navigate = useNavigate();

  const isUnlocked = (unitId: number) => {
    if (unitId === 1) return true;
    return completedUnits.includes(unitId - 1);
  };

  return (
    <div className="min-h-screen bg-background moroccan-pattern pb-20">
      {/* Header */}
      <div className="gradient-majorelle px-4 pt-6 pb-8 rounded-b-3xl shadow-majorelle">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-primary-foreground font-display">Al-kalima</h1>
            <p className="text-primary-foreground/70 text-sm font-display">Tu camino al árabe</p>
          </div>
          <DirhamsBar />
        </div>
      </div>

      {/* Lesson Path */}
      <div className="max-w-lg mx-auto px-4 pt-6">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

          {units.map((unit, i) => {
            const unlocked = isUnlocked(unit.id);
            const completed = completedUnits.includes(unit.id);
            const isNext = unlocked && !completed;

            return (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative flex items-start gap-4 mb-6"
              >
                {/* Node */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0 border-2 transition-all ${
                    completed
                      ? "gradient-terracotta border-terracotta shadow-moroccan"
                      : isNext
                      ? "gradient-majorelle border-majorelle shadow-majorelle animate-pulse"
                      : "bg-muted border-border"
                  }`}
                >
                  {completed ? (
                    <CheckCircle2 className="w-7 h-7 text-secondary-foreground" />
                  ) : unlocked ? (
                    <span>{unit.icon}</span>
                  ) : (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>

                {/* Card */}
                <button
                  onClick={() => unlocked && navigate(`/lesson/${unit.id}`)}
                  disabled={!unlocked}
                  className={`flex-1 rounded-2xl p-4 text-left transition-all ${
                    unlocked
                      ? "bg-card shadow-sm hover:shadow-md active:scale-[0.98]"
                      : "bg-muted/50 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground font-display text-base">
                      {unit.id}. {unit.title}
                    </h3>
                    {completed && (
                      <span className="flex items-center gap-1 text-xs text-emerald font-semibold">
                        <Gift className="w-3 h-3" /> +{unit.dirhamsReward} DH
                      </span>
                    )}
                  </div>
                  {unit.titleArabic && (
                    <p className="font-arabic text-muted-foreground mt-0.5">{unit.titleArabic}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1 font-display">{unit.description}</p>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
