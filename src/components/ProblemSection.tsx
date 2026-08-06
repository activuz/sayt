"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const ProblemSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-14 px-4 sm:px-6 bg-[#1e3a0f] text-[#eef2dc] relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-6 right-12 text-[#6b8f4e] text-2xl star-spin select-none" aria-hidden="true">✳</div>
      <div className="absolute bottom-8 left-8 text-[#6b8f4e] text-xl star-spin select-none" aria-hidden="true" style={{ animationDelay: '3s' }}>✳</div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl text-[#eef2dc] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.problem.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#2a4f17]/60 p-6 rounded-3xl border border-[#3d6b2e] backdrop-blur-sm flex flex-col justify-between space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#dce8c8] text-[#1e3a0f] flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#eef2dc] mb-2 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                {t.problem.card1Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#c5d4a8] font-medium leading-relaxed">
                {t.problem.card1Desc}
              </p>
            </div>
          </div>

          <div className="bg-[#2a4f17]/60 p-6 rounded-3xl border border-[#3d6b2e] backdrop-blur-sm flex flex-col justify-between space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#dce8c8] text-[#1e3a0f] flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#eef2dc] mb-2 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                {t.problem.card2Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#c5d4a8] font-medium leading-relaxed">
                {t.problem.card2Desc}
              </p>
            </div>
          </div>

          <div className="bg-[#2a4f17]/60 p-6 rounded-3xl border border-[#3d6b2e] backdrop-blur-sm flex flex-col justify-between space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#dce8c8] text-[#1e3a0f] flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#eef2dc] mb-2 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                {t.problem.card3Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#c5d4a8] font-medium leading-relaxed">
                {t.problem.card3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
