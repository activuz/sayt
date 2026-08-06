"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LeadForm } from "@/components/LeadForm";

export const SecondCtaSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="lead-form-section"
      className="py-14 md:py-20 px-4 sm:px-6 bg-[#dce8c8] relative overflow-hidden scroll-mt-16"
    >
      {/* Decorative stars */}
      <div className="absolute top-8 left-10 text-[#3d6b2e] text-2xl star-spin select-none hidden md:block" aria-hidden="true">✳</div>
      <div className="absolute bottom-10 right-12 text-[#3d6b2e] text-xl star-spin select-none hidden md:block" aria-hidden="true" style={{ animationDelay: '2s' }}>✳</div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left — Motivation text */}
        <div className="text-center lg:text-left space-y-4">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl text-[#1e3a0f] tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.secondCta.title}
          </h2>
          <p className="text-sm sm:text-base text-[#4a5e3a] font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
            {t.hero.subtitle}
          </p>

          {/* Trust highlights */}
          <div className="space-y-2 pt-2 max-w-md mx-auto lg:mx-0">
            {[t.hero.trust1, t.hero.trust2, t.hero.trust3].map((text, i) => (
              <div key={i} className="flex items-center space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-[#3d6b2e] text-white flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                <span className="text-xs sm:text-sm font-semibold text-[#1e3a0f]">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form card */}
        <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
          <LeadForm idPrefix="main" showTitleInCard={false} />
        </div>
      </div>
    </section>
  );
};
