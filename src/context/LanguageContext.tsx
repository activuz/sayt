"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { i18n, Language } from "@/lib/i18n";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: typeof i18n.cyrl;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Language>("cyrl");

  // Only read localStorage after client mounts (prevents hydration mismatch)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zotdor_lang") as Language;
      if (saved === "cyrl" || saved === "latn") {
        setLangState(saved);
      }
    } catch (_) {
      // localStorage unavailable (private mode etc.) — default stays cyrl
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("zotdor_lang", newLang);
    } catch (_) {}
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "cyrl" ? "latn" : "cyrl";
      try {
        localStorage.setItem("zotdor_lang", next);
      } catch (_) {}
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t: i18n[lang],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
