"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const OpenStateSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 px-4 bg-[#ffffff] border-b border-[#e8e2d5]">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#f7f4ee] border-2 border-[#d4cbba] p-5 sm:p-6 rounded-2xl text-center shadow-inner space-y-2">
          <div className="inline-flex items-center space-x-2 bg-[#e8e2d5] text-[#1b3e2b] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-1">
            <span>💡</span>
            <span>Очиқ маълумот</span>
          </div>
          <p className="text-xs sm:text-sm text-[#526054] font-medium leading-relaxed max-w-2xl mx-auto">
            {t.openState.text}
          </p>
        </div>
      </div>
    </section>
  );
};
