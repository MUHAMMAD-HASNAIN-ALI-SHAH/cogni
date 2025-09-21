import { create } from "zustand";

export const darkTheme = {
  backgroundColor: "#121212",
  color: "#ffffff",
  borderColor: "#333333",
  buttonBackground: "#1f1f1f",
  buttonColor: "#ffffff",
  inputBackground: "#1f1f1f",
  inputColor: "#ffffff",
  inputBorder: "#333333",
  cardColor: "#1e1e1e",
}

interface ThemeStore {
  theme: string;
  setTheme: (theme: string) => void;
}

const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: "light",
  setTheme: (theme) => {
    set({ theme });
  },
}));

export default useThemeStore;
