import { create } from "zustand";

const useDropdownStore = create((set) => ({
  openDropdown: null, // initially no dropdown is open
  setOpenDropdown: (dropdownId) => set({ openDropdown: dropdownId }),
  closeDropdown: () => set({ openDropdown: null }),
}));

export default useDropdownStore;
