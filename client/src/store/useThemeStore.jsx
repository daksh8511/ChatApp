import { create } from "zustand";

const useTheme = create((set) => ({
  myTheme: localStorage.getItem("chat-theme") || "dracula",
  setTheme: (selectedTheme) => {
    localStorage.setItem("chat-theme", selectedTheme);
    set({ myTheme: selectedTheme });
  },
}));

export default useTheme;
