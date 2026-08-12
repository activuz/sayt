"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { t, toggleLang } = useLanguage();

  return (
    <footer className="bg-[#1e3a0f] text-[#c5d4a8] py-10 px-4 sm:px-6 border-t border-[#2a4f17]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Brand */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span
              className="text-2xl font-bold tracking-tight text-[#eef2dc]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.footer.brand}
            </span>
          </div>
          <p className="text-xs text-[#6b8f4e] font-medium max-w-sm">
            {t.footer.tagline}
          </p>
        </div>

        {/* Links & Switcher */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-bold text-[#c5d4a8]">
          <a
            href="https://web.zotdor.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#eef2dc] transition-colors flex items-center space-x-1.5 cursor-pointer text-[#a8d45e]"
          >
            <span>web.zotdor.uz (Demo)</span>
          </a>

          <span className="hidden sm:inline text-[#3d6b2e]">•</span>

          <a
            href="https://t.me/zotdor_chorva_bozor"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#eef2dc] transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <span>{t.footer.telegram}</span>
          </a>

          <span className="hidden sm:inline text-[#3d6b2e]">•</span>

          <a href="tel:+998938848910" className="hover:text-[#eef2dc] transition-colors">
            {t.footer.phone}
          </a>

          <span className="hidden sm:inline text-[#3d6b2e]">•</span>

          <button
            onClick={toggleLang}
            type="button"
            className="min-h-touch px-4 py-2 bg-[#3d6b2e] text-[#eef2dc] font-bold text-xs rounded-full hover:bg-[#4a7c3a] border border-[#4a7c3a] transition-all active:scale-95 cursor-pointer"
          >
            {t.header.langSwitch}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-[#2a4f17] text-center text-xs text-[#6b8f4e] font-normal">
        {t.footer.copyright}
      </div>
    </footer>
  );
};
