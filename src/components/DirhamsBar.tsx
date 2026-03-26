import { useGameStore } from "@/store/gameStore";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function DirhamsBar() {
  const dirhams = useGameStore((s) => s.dirhams);
  const [prevDirhams, setPrevDirhams] = useState(dirhams);
  const [bouncing, setBouncing] = useState(false);

  useEffect(() => {
    if (dirhams !== prevDirhams) {
      setBouncing(true);
      setPrevDirhams(dirhams);
      const t = setTimeout(() => setBouncing(false), 600);
      return () => clearTimeout(t);
    }
  }, [dirhams, prevDirhams]);

  return (
    <div className="flex items-center gap-1.5 bg-accent/30 rounded-full px-3 py-1.5">
      <motion.span
        animate={bouncing ? { y: [0, -6, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="text-lg"
      >
        🪙
      </motion.span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={dirhams}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          className="font-bold text-sm text-foreground font-display"
        >
          {dirhams} DH
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
