import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

export default function Onboarding() {
  const setOnboardingSeen = useGameStore((s) => s.setOnboardingSeen);

  return (
    <div className="min-h-screen gradient-majorelle flex flex-col items-center justify-center p-6 text-center moroccan-pattern">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="text-7xl mb-6"
      >
        🕌
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-4xl font-extrabold text-primary-foreground mb-2 font-display"
      >
        Al-kalima
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="font-arabic text-3xl text-primary-foreground/90 mb-6"
      >
        الكلمة
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-primary-foreground/80 text-lg max-w-sm mb-2 font-display"
      >
        Aprende árabe básico, gana <span className="text-gradient-gold font-bold bg-clip-text">dirhams</span> virtuales y…
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-primary-foreground font-bold text-xl max-w-sm mb-10 font-display"
      >
        ¡Sobrevive al zoco de Marrakesh! 🏪
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        whileTap={{ scale: 0.95 }}
        onClick={setOnboardingSeen}
        className="gradient-terracotta text-secondary-foreground font-bold text-lg px-10 py-4 rounded-full shadow-moroccan font-display"
      >
        ¡Yalla, empezamos! 🚀
      </motion.button>
    </div>
  );
}
