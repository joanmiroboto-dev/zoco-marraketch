import { marketItems } from "@/data/lessons";
import { useGameStore } from "@/store/gameStore";
import DirhamsBar from "@/components/DirhamsBar";
import { useState } from "react";
import HaggleGame from "@/components/HaggleGame";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function Souk() {
  const { inventory } = useGameStore();
  const [haggleItem, setHaggleItem] = useState<string | null>(null);

  const activeItem = marketItems.find((m) => m.id === haggleItem);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="gradient-terracotta px-4 pt-6 pb-8 rounded-b-3xl shadow-moroccan">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-secondary-foreground font-display">
              Plaza Jemaa el-Fna
            </h1>
            <p className="text-secondary-foreground/70 text-sm font-display">
              ¡Regatea con los vendedores! 🏪
            </p>
          </div>
          <DirhamsBar />
        </div>
      </div>

      {/* Inventory badge */}
      {inventory.length > 0 && (
        <div className="max-w-lg mx-auto px-4 mt-4">
          <div className="bg-card rounded-2xl p-3 flex items-center gap-2 shadow-sm">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold font-display text-foreground">
              Tu colección: {inventory.length} objeto{inventory.length !== 1 ? "s" : ""}
            </span>
            <div className="flex gap-1 ml-auto">
              {inventory.map((id) => {
                const item = marketItems.find((m) => m.id === id);
                return item ? <span key={id} className="text-xl">{item.emoji}</span> : null;
              })}
            </div>
          </div>
        </div>
      )}

      {/* Market Grid */}
      <div className="max-w-lg mx-auto px-4 mt-6 grid grid-cols-2 gap-3">
        {marketItems.map((item, i) => {
          const owned = inventory.includes(item.id);
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => !owned && setHaggleItem(item.id)}
              disabled={owned}
              className={`rounded-2xl p-4 text-left transition-all ${
                owned
                  ? "bg-emerald/10 border-2 border-emerald/30"
                  : "bg-card border-2 border-border hover:border-primary active:scale-95 shadow-sm"
              }`}
            >
              <span className="text-4xl block mb-2">{item.emoji}</span>
              <h3 className="font-bold text-sm font-display text-foreground">{item.name}</h3>
              <p className="font-arabic text-muted-foreground text-sm">{item.nameArabic}</p>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs">🪙</span>
                <span className="text-sm font-bold text-accent font-display">
                  {owned ? "✓ Comprado" : `${item.basePrice} DH`}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Haggle Modal */}
      {activeItem && (
        <HaggleGame item={activeItem} onClose={() => setHaggleItem(null)} />
      )}
    </div>
  );
}
