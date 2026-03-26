import { glossaryItems } from "@/data/lessons";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const categories = [...new Set(glossaryItems.map((g) => g.category))];

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = glossaryItems.filter((item) => {
    const matchesSearch =
      !search ||
      item.spanish.toLowerCase().includes(search.toLowerCase()) ||
      item.transliteration.toLowerCase().includes(search.toLowerCase()) ||
      item.arabic.includes(search);
    const matchesCat = !activeCategory || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="gradient-majorelle px-4 pt-6 pb-8 rounded-b-3xl shadow-majorelle">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-extrabold text-primary-foreground font-display mb-1">
            📖 Glosario de viaje
          </h1>
          <p className="text-primary-foreground/70 text-sm font-display">Vocabulario esencial para Marruecos</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar palabra..."
            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm font-display text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold font-display transition-all ${
              !activeCategory ? "gradient-majorelle text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold font-display transition-all ${
                activeCategory === cat ? "gradient-terracotta text-secondary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-2 mt-2">
          {filtered.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="bg-card rounded-xl p-3 flex items-center gap-4 shadow-sm"
            >
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-foreground font-display">{item.spanish}</p>
                <p className="text-xs text-muted-foreground font-display">{item.transliteration}</p>
              </div>
              <p className="font-arabic text-4xl text-primary shrink-0">{item.arabic}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
