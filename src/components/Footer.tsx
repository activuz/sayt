"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { t, toggleLang } = useLanguage();

  return (
    <footer className="bg-[#122b1e] text-[#f7f4ee] py-10 px-4 border-t-4 border-[#1b3e2b]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Brand */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="text-2xl font-black tracking-tight text-[#f7f4ee]">
              {t.footer.brand}
            </span>
          </div>
          <p className="text-xs text-[#e8e2d5] opacity-80 max-w-sm font-medium">
            {t.footer.tagline}
          </p>
        </div>

        {/* Links & Switcher */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-bold text-[#e8e2d5]">
          <a
            href="https://t.me/mirfozil_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center space-x-1"
          >
            <span>{t.footer.telegram}</span>
          </a>

          <span className="hidden sm:inline opacity-40">•</span>

          <a href="tel:+998901234567" className="hover:underline">
            {t.footer.phone}
          </a>

          <span className="hidden sm:inline opacity-40">•</span>

          <button
            onClick={toggleLang}
            type="button"
            className="min-h-touch px-3 py-1.5 bg-[#e8e2d5] text-[#1b3e2b] font-extrabold text-xs rounded-lg hover:bg-white transition-colors"
          >
            {t.header.langSwitch}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-[#1b3e2b]/80 text-center text-xs text-[#e8e2d5] opacity-60 font-medium">
        {t.footer.copyright}
      </div>
    </footer>
  );
};
