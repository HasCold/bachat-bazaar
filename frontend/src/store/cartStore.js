import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        const { items } = get()
        const existing = items.find(i => i._id === product._id)
        if (existing) {
          set({ items: items.map(i => i._id === product._id ? { ...i, qty: i.qty + 1 } : i) })
        } else {
          set({ items: [...items, { ...product, qty: 1 }] })
        }
      },

      removeItem: (id) => set(s => ({ items: s.items.filter(i => i._id !== id) })),

      updateQty: (id, qty) => {
        if (qty < 1) { get().removeItem(id); return }
        set(s => ({ items: s.items.map(i => i._id === id ? { ...i, qty } : i) }))
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set(s => ({ isOpen: !s.isOpen })),
      closeCart: () => set({ isOpen: false }),
    }),
    { name: 'bachat-cart' }
  )
)

// Selector helpers — use these in components
export const selectTotal = (s) => s.items.reduce((sum, i) => sum + i.price * i.qty, 0)
export const selectCount = (s) => s.items.reduce((sum, i) => sum + i.qty, 0)

export default useCartStore
