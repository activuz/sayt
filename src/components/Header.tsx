"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const Header: React.FC = () => {
  const { t, toggleLang } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-[#eef2dc]/95 backdrop-blur-md border-b border-[#c5d4a8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2.5">
          <img src="/favicon.webp" alt="Logo" className="w-10 h-10 rounded-full" />
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1e3a0f] block leading-none" style={{ fontFamily: "var(--font-display)" }}>
              Zotdor<span className="text-[#3d6b2e]">.uz</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#4a5e3a] block mt-0.5">
              {t.header.subBrand}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <a
            href="https://web.zotdor.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-touch px-3.5 sm:px-4 py-2 bg-[#3d6b2e] hover:bg-[#2a4f17] text-white font-bold text-xs sm:text-sm rounded-full transition-all flex items-center space-x-1.5 shadow-sm active:scale-95 cursor-pointer border border-[#2a4f17]/20"
          >
            <svg
              className="w-4 h-4 text-[#a8d45e]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <span>{t.header.demoBtn}</span>
          </a>

          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            type="button"
            className="min-h-touch px-3.5 sm:px-4 py-2 bg-[#1e3a0f] hover:bg-[#2a4f17] text-[#eef2dc] font-bold text-xs sm:text-sm rounded-full transition-colors flex items-center space-x-2 shadow-sm active:scale-95 cursor-pointer"
            aria-label="Alifboni o'zgartirish"
          >
            <svg
              className="w-4 h-4 text-[#eef2dc]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <span>{t.header.langSwitch}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
