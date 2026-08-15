"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { i18n, Language, LANGUAGE_CYCLE } from "@/lib/i18n";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: typeof i18n.cyrl;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const VALID_LANGS: Language[] = ["cyrl", "latn", "en"];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Language>("cyrl");

  // Only read localStorage after client mounts (prevents hydration mismatch)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zotdor_lang") as Language;
      if (VALID_LANGS.includes(saved)) {
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

  // Cycle through languages: cyrl → latn → en → cyrl
  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const currentIndex = LANGUAGE_CYCLE.indexOf(prev);
      const next = LANGUAGE_CYCLE[(currentIndex + 1) % LANGUAGE_CYCLE.length];
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

