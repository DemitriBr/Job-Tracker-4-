import { create } from 'zustand'

interface UIStore {
  editingApplicationId: string | null
  startEditing: (id: string) => void
  stopEditing: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  editingApplicationId: null,
  
  startEditing: (id) => set({ editingApplicationId: id }),
  
  stopEditing: () => set({ editingApplicationId: null })
}))