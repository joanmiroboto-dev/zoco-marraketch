import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { MarketItem } from "@/data/lessons";
import { haggleDialogues } from "@/data/lessons";
import { useGameStore } from "@/store/gameStore";

interface Props {
  item: MarketItem;
  onClose: () => void;
}

type Stage = "greeting" | "challenge" | "success" | "fail" | "bought";

function pickNumberChallenge(targetDiscount: number) {
  // Pick a number close to the discount amount
  const available = haggleDialogues.numbers;
  const correct = available.reduce((prev, curr) =>
    Math.abs(curr.value - targetDiscount) < Math.abs(prev.value - targetDiscount) ? curr : prev
  );
  // Pick 3 wrong options
  const wrong = available.filter((n) => n.value !== correct.value);
  const shuffledWrong = wrong.sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [...shuffledWrong, correct].sort(() => Math.random() - 0.5);
  return { correct, options, question: `Dile al mercader el precio que quieres pagar: ${correct.value} dirhams` };
}

function pickPhraseChallenge() {
  const phrases = haggleDialogues.tooExpensive;
  const correct = phrases[Math.floor(Math.random() * phrases.length)];
  const wrongPhrases = [
    { arabic: "مَرْحَبًا", transliteration: "Marhaban", spanish: "Hola" },
    { arabic: "نَعَم", transliteration: "Na'am", spanish: "Sí" },
    { arabic: "أُرِيد", transliteration: "Uriid", spanish: "Quiero" },
  ];
  const options = [...wrongPhrases, correct].sort(() => Math.random() - 0.5);
  return {
    correct,
    options,
    question: `¿Cómo dices "${correct.spanish}" en árabe?`,
  };
}

export default function HaggleGame({ item, onClose }: Props) {
  const { dirhams, spendDirhams, addToInventory } = useGameStore();
  const [stage, setStage] = useState<Stage>("greeting");
  const [currentPrice, setCurrentPrice] = useState(item.basePrice);
  const [round, setRound] = useState(0);

  const maxRounds = 3;
  const discountPerRound = Math.floor(item.basePrice * 0.15);
  const minPrice = item.basePrice - discountPerRound * maxRounds;

  const challenge = useMemo(() => {
    if (round % 2 === 0) {
      return pickPhraseChallenge();
    }
    return pickNumberChallenge(currentPrice - discountPerRound);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const handleAnswer = (optArabic: string) => {
    if (optArabic === challenge.correct.arabic) {
      const newPrice = Math.max(minPrice, currentPrice - discountPerRound);
      setCurrentPrice(newPrice);
      if (round + 1 >= maxRounds) {
        setStage("success");
      } else {
        setRound((r) => r + 1);
      }
    } else {
      setStage("fail");
    }
  };

  const handleBuy = () => {
    if (spendDirhams(currentPrice)) {
      addToInventory(item.id);
      setStage("bought");
    }
  };

  const canAfford = dirhams >= currentPrice;

  return (
    <div className="fixed inset-0 z-50 bg-foreground/60 flex items-end sm:items-center justify-center p-4">
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 200, opacity: 0 }}
        className="bg-card rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
      >
        {/* Merchant header */}
        <div className="gradient-terracotta p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🧔</span>
            <div>
              <p className="text-secondary-foreground font-bold font-display">Mercader Hassan</p>
              <p className="text-secondary-foreground/70 text-sm font-display">Plaza Jemaa el-Fna</p>
            </div>
          </div>
          <button onClick={onClose} className="text-secondary-foreground/70">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            {stage === "greeting" && (
              <motion.div key="greet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <span className="text-5xl block mb-3">{item.emoji}</span>
                <p className="font-arabic text-4xl text-foreground mb-1">{haggleDialogues.greetings[0].arabic}</p>
                <p className="text-muted-foreground text-sm font-display mb-3">{haggleDialogues.greetings[0].spanish}</p>
                <p className="font-display text-foreground mb-1">
                  <strong>{item.name}</strong> por <span className="text-accent font-bold">🪙 {item.basePrice} DH</span>
                </p>
                <p className="text-sm text-muted-foreground font-display mb-4">¡Regatea usando tu árabe!</p>
                <button
                  onClick={() => setStage("challenge")}
                  className="gradient-majorelle text-primary-foreground px-6 py-3 rounded-full font-bold font-display"
                >
                  ¡Empezar a regatear! 💪
                </button>
              </motion.div>
            )}

            {stage === "challenge" && (
              <motion.div key={`ch-${round}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-muted-foreground font-display">Ronda {round + 1}/{maxRounds}</span>
                  <span className="text-sm font-bold text-accent font-display">🪙 {currentPrice} DH</span>
                </div>
                <p className="font-bold text-foreground font-display mb-4">{challenge.question}</p>
                <div className="grid grid-cols-1 gap-2">
                  {challenge.options.map((opt) => (
                    <button
                      key={opt.arabic}
                      onClick={() => handleAnswer(opt.arabic)}
                      className="bg-muted hover:bg-primary/10 border-2 border-border hover:border-primary rounded-xl p-3 text-left transition-all active:scale-95"
                    >
                      <p className="font-arabic text-3xl text-foreground">{opt.arabic}</p>
                      <p className="text-xs text-muted-foreground font-display">{opt.transliteration}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {stage === "success" && (
              <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                <p className="text-5xl mb-3">🤝</p>
                <p className="font-bold text-xl text-foreground font-display mb-2">¡Buen regateo!</p>
                <p className="text-muted-foreground font-display mb-1">
                  Precio final: <span className="font-bold text-accent">🪙 {currentPrice} DH</span>
                </p>
                <p className="text-sm text-muted-foreground font-display mb-4">
                  Ahorraste {item.basePrice - currentPrice} DH
                </p>
                {canAfford ? (
                  <button onClick={handleBuy} className="gradient-terracotta text-secondary-foreground px-6 py-3 rounded-full font-bold font-display">
                    ¡Comprar! {item.emoji}
                  </button>
                ) : (
                  <p className="text-destructive font-semibold font-display">No tienes suficientes dirhams 😢</p>
                )}
              </motion.div>
            )}

            {stage === "fail" && (
              <motion.div key="fail" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                <p className="text-5xl mb-3">😅</p>
                <p className="font-bold text-xl text-foreground font-display mb-2">¡Respuesta incorrecta!</p>
                <p className="text-muted-foreground font-display mb-4">El mercader no baja el precio…</p>
                <div className="flex gap-3 justify-center">
                  {canAfford && (
                    <button
                      onClick={() => {
                        if (spendDirhams(currentPrice)) {
                          addToInventory(item.id);
                          setStage("bought");
                        }
                      }}
                      className="gradient-terracotta text-secondary-foreground px-5 py-3 rounded-full font-bold text-sm font-display"
                    >
                      Comprar a 🪙{currentPrice} DH
                    </button>
                  )}
                  <button onClick={onClose} className="bg-muted text-muted-foreground px-5 py-3 rounded-full font-semibold text-sm font-display">
                    Salir
                  </button>
                </div>
              </motion.div>
            )}

            {stage === "bought" && (
              <motion.div key="bought" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                <p className="text-6xl mb-3">{item.emoji}</p>
                <p className="font-bold text-xl text-foreground font-display mb-2">¡Mabruk! 🎉</p>
                <p className="text-muted-foreground font-display mb-4">Has conseguido: <strong>{item.name}</strong></p>
                <button onClick={onClose} className="gradient-majorelle text-primary-foreground px-6 py-3 rounded-full font-bold font-display">
                  Volver al zoco
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
