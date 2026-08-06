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
          <div className="w-10 h-10 rounded-2xl bg-[#1e3a0f] text-[#eef2dc] flex items-center justify-center font-black text-lg shadow-sm">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 8h-2c0-2.21-1.79-4-4-4S9 5.79 9 8H7c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm-5 6h2v2H8v-2zm4 6H8v-2h4v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2z" />
            </svg>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1e3a0f] block leading-none" style={{ fontFamily: "var(--font-display)" }}>
              Zotdor<span className="text-[#3d6b2e]">.uz</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#4a5e3a] block mt-0.5">
              {t.header.subBrand}
            </span>
          </div>
        </div>

        {/* Language Switcher */}
        <button
          onClick={toggleLang}
          type="button"
          className="min-h-touch px-4 py-2 bg-[#1e3a0f] hover:bg-[#2a4f17] text-[#eef2dc] font-bold text-xs sm:text-sm rounded-full transition-colors flex items-center space-x-2 shadow-sm active:scale-95 cursor-pointer"
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
    </header>
  );
};
