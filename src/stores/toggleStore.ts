// stores/useToggleStore.ts
import { create } from "zustand";

export type ToggleSection = "menu" | "chat" | "filter" | "width";

interface ToggleState {
  toggle: {
    menu: boolean;
    chat: boolean;
    filter: boolean;
    width: boolean;
  };
  toggleSection: (section: ToggleSection) => void;
  setToggleState: (section: ToggleSection, value: boolean) => void;
  resetToggles: () => void;
}

export const useToggleStore = create<ToggleState>((set) => ({
  toggle: {
    menu: false,
    chat: false,
    filter: false,
    width: false,
  },
  toggleSection: (section) =>
    set((state) => ({
      toggle: {
        ...state.toggle,
        [section]: !state.toggle[section],
      },
    })),
  setToggleState: (section, value) =>
    set((state) => ({
      toggle: {
        ...state.toggle,
        [section]: value,
      },
    })),
  resetToggles: () =>
    set(() => ({
      toggle: {
        menu: false,
        chat: false,
        filter: false,
        width: false,
      },
    })),
}));
