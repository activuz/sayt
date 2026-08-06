"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const OpenStateSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 px-4 sm:px-6 bg-[#eef2dc]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-2 border-[#c5d4a8] p-6 sm:p-8 rounded-3xl text-center space-y-3 relative overflow-hidden">
          {/* Decorative star */}
          <div className="absolute top-3 right-4 text-[#3d6b2e] text-lg star-spin select-none" aria-hidden="true">✳</div>

          <span className="inline-flex items-center space-x-2 bg-[#3d6b2e] text-[#eef2dc] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>💡</span>
            <span>{t.openState.badge}</span>
          </span>
          <p className="text-sm sm:text-base text-[#4a5e3a] font-medium leading-relaxed max-w-2xl mx-auto">
            {t.openState.text}
          </p>
        </div>
      </div>
    </section>
  );
};
