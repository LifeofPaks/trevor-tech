import { create } from "zustand";

const useMobileMenuStore = create((set) => ({
  mobileMenuOpen: false,

  // toggle open/close
  setMobileMenuOpen: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  // explicitly open
  openMobileMenu: () => set({ mobileMenuOpen: true }),

  // explicitly close
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}));

export default useMobileMenuStore;
