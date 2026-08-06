"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const SolutionSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-14 px-4 sm:px-6 bg-[#eef2dc] relative overflow-hidden">
      {/* Decorative star */}
      <div className="absolute top-10 left-8 text-[#3d6b2e] text-2xl star-spin select-none hidden md:block" aria-hidden="true">✳</div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl text-[#1e3a0f] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.solution.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#c5d4a8] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#3d6b2e] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#3d6b2e] text-[#eef2dc] flex items-center justify-center font-black text-xl shrink-0">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1e3a0f] mb-2 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                {t.solution.step1Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5e3a] font-medium leading-relaxed">
                {t.solution.step1Desc}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#c5d4a8] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#3d6b2e] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#3d6b2e] text-[#eef2dc] flex items-center justify-center font-black text-xl shrink-0">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1e3a0f] mb-2 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                {t.solution.step2Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5e3a] font-medium leading-relaxed">
                {t.solution.step2Desc}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#c5d4a8] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#3d6b2e] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#3d6b2e] text-[#eef2dc] flex items-center justify-center font-black text-xl shrink-0">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1e3a0f] mb-2 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                {t.solution.step3Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5e3a] font-medium leading-relaxed">
                {t.solution.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
