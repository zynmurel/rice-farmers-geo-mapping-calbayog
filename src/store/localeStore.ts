import { create } from "zustand";
import en from "../../messages/en.json";
import tl from "../../messages/tl.json";
import wr from "../../messages/wr.json";

type Locale = "en" | "tl" | "wr";

interface LocaleState {
  locale: Locale;
  messages: typeof en;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: "en",
  messages: en,
  setLocale: (newLocale: Locale) => {
    localStorage.setItem("locale", newLocale); // persist in localStorage
    set({
      locale: newLocale,
      messages: newLocale === "tl" ? tl : newLocale === "wr" ? wr : en,
    });
  },
}));
