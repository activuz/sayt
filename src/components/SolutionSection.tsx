"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const SolutionSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 px-4 bg-[#ffffff] border-b border-[#e8e2d5]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1c261e] tracking-tight">
            {t.solution.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-[#f7f4ee] p-6 rounded-2xl border-2 border-[#e8e2d5] relative overflow-hidden shadow-sm flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#1b3e2b] text-white flex items-center justify-center font-black text-lg">
              1
            </div>
            <div>
              <h3 className="text-lg font-black text-[#1c261e] mb-2 leading-snug">
                {t.solution.step1Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#526054] font-medium leading-relaxed">
                {t.solution.step1Desc}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#f7f4ee] p-6 rounded-2xl border-2 border-[#e8e2d5] relative overflow-hidden shadow-sm flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#1b3e2b] text-white flex items-center justify-center font-black text-lg">
              2
            </div>
            <div>
              <h3 className="text-lg font-black text-[#1c261e] mb-2 leading-snug">
                {t.solution.step2Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#526054] font-medium leading-relaxed">
                {t.solution.step2Desc}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#f7f4ee] p-6 rounded-2xl border-2 border-[#e8e2d5] relative overflow-hidden shadow-sm flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#1b3e2b] text-white flex items-center justify-center font-black text-lg">
              3
            </div>
            <div>
              <h3 className="text-lg font-black text-[#1c261e] mb-2 leading-snug">
                {t.solution.step3Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#526054] font-medium leading-relaxed">
                {t.solution.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
