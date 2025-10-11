import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type LanguageContextType = {
  lang: "en" | "he";
  setLang: (lang: "en" | "he") => void;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "he", // <-- כאן מגדירים עברית כברירת מחדל
  setLang: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<"en" | "he">("he"); // <-- עברית כברירת מחדל

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
