"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LeadForm } from "@/components/LeadForm";

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      className="text-[#f7f4ee] pt-8 pb-12 px-4 relative overflow-hidden border-b-4 border-[#4a3728]"
      style={{
        backgroundImage: "url('/image2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark green overlay for text readability */}
      <div className="absolute inset-0 bg-[#1b3e2b]/80 pointer-events-none" />


      <div className="max-w-4xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Heading & Subtitle */}
        <div className="md:col-span-6 text-center md:text-left space-y-4 pt-2">
          {/* Top Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#f7f4ee] text-[#1b3e2b] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>{t.hero.badge}</span>
          </div>

          {/* H1 Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-[#f7f4ee]">
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#e8e2d5] font-medium leading-relaxed max-w-xl">
            {t.hero.subtitle}
          </p>

          {/* Trust Highlights */}
          <div className="pt-2 space-y-2 text-left hidden md:block">
            <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-bold text-[#e8e2d5]">
              <span className="w-5 h-5 rounded-full bg-[#e8e2d5] text-[#1b3e2b] flex items-center justify-center font-black text-xs shrink-0">
                ✓
              </span>
              <span>0% комиссия — бепул эълон бериш</span>
            </div>
            <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-bold text-[#e8e2d5]">
              <span className="w-5 h-5 rounded-full bg-[#e8e2d5] text-[#1b3e2b] flex items-center justify-center font-black text-xs shrink-0">
                ✓
              </span>
              <span>Тўғридан-тўғри сотувчи ва харидорлар</span>
            </div>
            <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-bold text-[#e8e2d5]">
              <span className="w-5 h-5 rounded-full bg-[#e8e2d5] text-[#1b3e2b] flex items-center justify-center font-black text-xs shrink-0">
                ✓
              </span>
              <span>Барча 14 вилоят ва туманлар бўйича</span>
            </div>
          </div>
        </div>

        {/* Right Column: Lead Form DIRECTLY HERE */}
        <div className="md:col-span-6 w-full">
          <LeadForm idPrefix="hero" />
        </div>
      </div>
    </section>
  );
};
