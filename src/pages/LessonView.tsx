import { useParams, useNavigate } from "react-router-dom";
import { units } from "@/data/lessons";
import { useGameStore } from "@/store/gameStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

type Phase = "learn" | "quiz" | "result";

export default function LessonView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const unit = units.find((u) => u.id === Number(id));
  const { completeUnit, addDirhams, completedUnits } = useGameStore();

  const [phase, setPhase] = useState<Phase>("learn");
  const [cardIndex, setCardIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!unit) return <div className="p-8 text-center">Unidad no encontrada</div>;

  const card = unit.cards[cardIndex];
  const quizQ = unit.quiz[quizIndex];
  const alreadyCompleted = completedUnits.includes(unit.id);

  const handleAnswer = (idx: number) => {
    if (showFeedback) return;
    setSelectedAnswer(idx);
    setShowFeedback(true);
    if (idx === quizQ.correctIndex) setScore((s) => s + 1);

    setTimeout(() => {
      if (quizIndex < unit.quiz.length - 1) {
        setQuizIndex((i) => i + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setPhase("result");
      }
    }, 1200);
  };

  const handleComplete = () => {
    const passed = score >= Math.ceil(unit.quiz.length * 0.6);
    if (passed && !alreadyCompleted) {
      completeUnit(unit.id);
      addDirhams(unit.dirhamsReward);
    }
    navigate("/");
  };

  const passed = score >= Math.ceil(unit.quiz.length * 0.6);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-majorelle px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="text-primary-foreground">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h2 className="text-primary-foreground font-bold font-display">{unit.title}</h2>
          <p className="text-primary-foreground/60 text-xs font-display">
            {phase === "learn"
              ? `Tarjeta ${cardIndex + 1} / ${unit.cards.length}`
              : phase === "quiz"
              ? `Pregunta ${quizIndex + 1} / ${unit.quiz.length}`
              : "Resultado"}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted">
        <div
          className="h-full gradient-terracotta transition-all duration-300"
          style={{
            width:
              phase === "learn"
                ? `${((cardIndex + 1) / unit.cards.length) * 50}%`
                : phase === "quiz"
                ? `${50 + ((quizIndex + 1) / unit.quiz.length) * 50}%`
                : "100%",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <AnimatePresence mode="wait">
          {phase === "learn" && (
            <motion.div
              key={`card-${cardIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-sm"
            >
              <div className="bg-card rounded-3xl p-8 shadow-moroccan text-center">
                <p className="font-arabic text-6xl mb-4 text-foreground leading-relaxed">{card.arabic}</p>
                <p className="text-xl font-bold text-primary font-display mb-1">{card.transliteration}</p>
                <p className="text-muted-foreground font-display">{card.spanish}</p>
                {card.note && (
                  <p className="text-sm text-muted-foreground/70 mt-3 italic font-display">{card.note}</p>
                )}
              </div>

              <div className="flex justify-between mt-8 px-4">
                <button
                  onClick={() => setCardIndex((i) => Math.max(0, i - 1))}
                  disabled={cardIndex === 0}
                  className="flex items-center gap-1 text-muted-foreground disabled:opacity-30 font-display"
                >
                  <ArrowLeft className="w-5 h-5" /> Anterior
                </button>
                <button
                  onClick={() => {
                    if (cardIndex < unit.cards.length - 1) {
                      setCardIndex((i) => i + 1);
                    } else {
                      setPhase("quiz");
                    }
                  }}
                  className="flex items-center gap-1 text-primary font-bold font-display"
                >
                  {cardIndex < unit.cards.length - 1 ? (
                    <>
                      Siguiente <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      ¡Al quiz! 🎯
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {phase === "quiz" && quizQ && (
            <motion.div
              key={`quiz-${quizIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full max-w-sm"
            >
              <h3 className="text-xl font-bold text-center mb-6 font-display text-foreground">
                {quizQ.question}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {quizQ.options.map((opt, idx) => {
                  const isCorrect = idx === quizQ.correctIndex;
                  const isSelected = selectedAnswer === idx;
                  let optionClasses = "rounded-2xl p-4 text-center font-semibold text-lg border-2 transition-all font-display ";
                  if (quizQ.type === "spanish-to-arabic" || quizQ.type === "arabic-to-spanish") {
                    // Check if option contains Arabic
                    const hasArabic = /[\u0600-\u06FF]/.test(opt);
                    if (hasArabic) optionClasses += "font-arabic text-2xl ";
                  }

                  if (showFeedback) {
                    if (isCorrect) {
                      optionClasses += "bg-emerald/20 border-emerald text-emerald ";
                    } else if (isSelected && !isCorrect) {
                      optionClasses += "bg-destructive/20 border-destructive text-destructive ";
                    } else {
                      optionClasses += "bg-muted border-border text-muted-foreground ";
                    }
                  } else {
                    optionClasses += "bg-card border-border hover:border-primary active:scale-95 text-foreground ";
                  }

                  return (
                    <button key={idx} onClick={() => handleAnswer(idx)} className={optionClasses}>
                      <div className="flex items-center justify-center gap-2">
                        {showFeedback && isCorrect && <Check className="w-5 h-5" />}
                        {showFeedback && isSelected && !isCorrect && <X className="w-5 h-5" />}
                        {opt}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm text-center"
            >
              <div className="text-6xl mb-4">{passed ? "🎉" : "😅"}</div>
              <h3 className="text-2xl font-extrabold font-display text-foreground mb-2">
                {passed ? "¡Mabruk! (مبروك)" : "¡Casi lo tienes!"}
              </h3>
              <p className="text-muted-foreground font-display mb-2">
                {score} de {unit.quiz.length} respuestas correctas
              </p>
              {passed && !alreadyCompleted && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-2 text-xl font-bold text-accent my-4"
                >
                  <span className="animate-coin-bounce">🪙</span>
                  +{unit.dirhamsReward} Dirhams
                </motion.div>
              )}
              {alreadyCompleted && passed && (
                <p className="text-sm text-muted-foreground italic font-display">Ya habías completado esta lección</p>
              )}
              <button
                onClick={handleComplete}
                className="mt-6 gradient-terracotta text-secondary-foreground font-bold px-8 py-3 rounded-full shadow-moroccan font-display"
              >
                {passed ? "Continuar" : "Reintentar"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
