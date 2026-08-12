"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollToForm = () => {
    const formEl = document.getElementById("lead-form-section");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative py-12 md:py-20 px-4 sm:px-6 overflow-hidden min-h-[70vh] flex items-center">
      {/* Background image — very subtle */}
      <div
        className="absolute inset-0 opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage: "url('/image2.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Decorative stars */}
      <div className="absolute top-12 right-[25%] text-[#3d6b2e] text-4xl star-spin hidden md:block select-none" aria-hidden="true">✳</div>
      <div className="absolute bottom-20 left-[8%] text-[#3d6b2e] text-3xl star-spin hidden md:block select-none" aria-hidden="true" style={{ animationDelay: '3s' }}>✳</div>
      <div className="absolute top-[40%] right-[8%] text-[#3d6b2e] text-2xl star-spin hidden lg:block select-none" aria-hidden="true" style={{ animationDelay: '5s' }}>✳</div>

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
        {/* LEFT — Typography & CTA */}
        <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#3d6b2e] text-[#eef2dc] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#a8d45e] animate-pulse"></span>
            <span>{t.hero.badge}</span>
          </div>

          {/* Large Display Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-[#1e3a0f]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#4a5e3a] font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons — pill shape like template */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
            <button
              onClick={scrollToForm}
              type="button"
              className="min-h-touch px-7 py-3.5 bg-[#3d6b2e] hover:bg-[#2a4f17] text-white font-bold text-sm sm:text-base rounded-full transition-all active:scale-95 shadow-md cursor-pointer inline-flex items-center space-x-2"
            >
              <span>{t.form.submitBtn}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            <a
              href="https://web.zotdor.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-touch px-6 py-3.5 bg-[#1e3a0f] hover:bg-[#2a4f17] text-[#eef2dc] font-bold text-sm sm:text-base rounded-full inline-flex items-center space-x-2 transition-all active:scale-95 shadow-md border border-[#a8d45e]/30 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#a8d45e] animate-pulse"></span>
              <span>{t.hero.demoBtn}</span>
              <svg className="w-4 h-4 text-[#a8d45e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT — Photo Collage (tilted frames like template) */}
        <div className="relative order-1 lg:order-2 flex items-center justify-center min-h-[300px] sm:min-h-[380px] lg:min-h-[420px]">
          {/* Main large photo — sheep/livestock */}
          <div className="relative z-10 w-[260px] sm:w-[300px] h-[320px] sm:h-[370px] rounded-3xl overflow-hidden border-[3px] border-[#1e3a0f] shadow-xl -rotate-2">
            <img
              src="/image0.webp"
              alt="Chorva mollari"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Top-right smaller tilted photo */}
          <div className="absolute top-0 right-0 sm:right-4 lg:-right-2 w-[120px] sm:w-[140px] h-[100px] sm:h-[115px] rounded-2xl overflow-hidden border-[3px] border-[#1e3a0f] shadow-lg rotate-6 z-20">
            <img
              src="/image3.webp"
              alt="Hayvonlar"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Bottom-left smaller tilted photo */}
          <div className="absolute bottom-4 left-0 sm:left-4 lg:-left-4 w-[110px] sm:w-[130px] h-[95px] sm:h-[110px] rounded-2xl overflow-hidden border-[3px] border-[#1e3a0f] shadow-lg -rotate-6 z-20">
            <img
              src="/images.webp"
              alt="Chorvachilik"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Decorative star near photos */}
          <div className="absolute -top-2 left-[40%] text-[#3d6b2e] text-xl star-spin select-none" aria-hidden="true" style={{ animationDelay: '1.5s' }}>✳</div>
          <div className="absolute bottom-0 right-[25%] text-[#3d6b2e] text-lg star-spin select-none" aria-hidden="true" style={{ animationDelay: '4s' }}>✳</div>
        </div>
      </div>
    </section>
  );
};
