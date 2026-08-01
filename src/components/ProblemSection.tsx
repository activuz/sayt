"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const ProblemSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 px-4 bg-[#f7f4ee] border-b border-[#e8e2d5]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1c261e] tracking-tight">
            {t.problem.title}
          </h2>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#ffffff] p-6 rounded-2xl border-2 border-[#e8e2d5] shadow-sm flex flex-col justify-between space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#e8f0eb] text-[#1b3e2b] flex items-center justify-center border border-[#2d5a3f]/20 shrink-0">
              <svg
                className="w-6 h-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-black text-[#1c261e] mb-2 leading-snug">
                {t.problem.card1Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#526054] font-medium leading-relaxed">
                {t.problem.card1Desc}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#ffffff] p-6 rounded-2xl border-2 border-[#e8e2d5] shadow-sm flex flex-col justify-between space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#e8f0eb] text-[#1b3e2b] flex items-center justify-center border border-[#2d5a3f]/20 shrink-0">
              <svg
                className="w-6 h-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-black text-[#1c261e] mb-2 leading-snug">
                {t.problem.card2Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#526054] font-medium leading-relaxed">
                {t.problem.card2Desc}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#ffffff] p-6 rounded-2xl border-2 border-[#e8e2d5] shadow-sm flex flex-col justify-between space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#e8f0eb] text-[#1b3e2b] flex items-center justify-center border border-[#2d5a3f]/20 shrink-0">
              <svg
                className="w-6 h-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-black text-[#1c261e] mb-2 leading-snug">
                {t.problem.card3Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#526054] font-medium leading-relaxed">
                {t.problem.card3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
