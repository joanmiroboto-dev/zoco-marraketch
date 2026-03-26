import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  dirhams: number;
  completedUnits: number[];
  inventory: string[];
  currentUnit: number | null;
  hasSeenOnboarding: boolean;

  addDirhams: (amount: number) => void;
  spendDirhams: (amount: number) => boolean;
  completeUnit: (unitId: number) => void;
  addToInventory: (itemId: string) => void;
  setCurrentUnit: (unitId: number | null) => void;
  setOnboardingSeen: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      dirhams: 0,
      completedUnits: [],
      inventory: [],
      currentUnit: null,
      hasSeenOnboarding: false,

      addDirhams: (amount) => set((s) => ({ dirhams: s.dirhams + amount })),
      spendDirhams: (amount) => {
        if (get().dirhams >= amount) {
          set((s) => ({ dirhams: s.dirhams - amount }));
          return true;
        }
        return false;
      },
      completeUnit: (unitId) =>
        set((s) => ({
          completedUnits: s.completedUnits.includes(unitId)
            ? s.completedUnits
            : [...s.completedUnits, unitId],
        })),
      addToInventory: (itemId) =>
        set((s) => ({
          inventory: s.inventory.includes(itemId)
            ? s.inventory
            : [...s.inventory, itemId],
        })),
      setCurrentUnit: (unitId) => set({ currentUnit: unitId }),
      setOnboardingSeen: () => set({ hasSeenOnboarding: true }),
    }),
    { name: "al-kalima-game" }
  )
);
