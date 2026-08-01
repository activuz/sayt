"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";

interface LeadFormProps {
  idPrefix?: string;
  showTitleInCard?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  idPrefix = "hero",
  showTitleInCard = false,
}) => {
  const { t, lang } = useLanguage();

  // Form input states
  const [name, setName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [phone, setPhone] = useState<string>("+998 ");

  // Validation error states
  const [nameError, setNameError] = useState<string>("");
  const [regionError, setRegionError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [leadId, setLeadId] = useState<string>("");

  // Registered leads count (Supabase)
  const [registeredCount, setRegisteredCount] = useState<number>(0);

  // Survey flow states
  // surveyState: 'idle' | 'offered' | 'answering' | 'completed' | 'dismissed'
  const [surveyState, setSurveyState] = useState<
    "idle" | "offered" | "answering" | "completed" | "dismissed"
  >("idle");
  const [currentQuestion, setCurrentQuestion] = useState<number>(1); // 1 to 6

  // Survey responses
  const [role, setRole] = useState<string>("");
  const [animalTypes, setAnimalTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("");
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [preferredPlatform, setPreferredPlatform] = useState<string>("");
  const [transactionFreq, setTransactionFreq] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  // Fetch count on mount
  useEffect(() => {
    fetch("/api/leads-count")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setRegisteredCount(data.count);
        }
      })
      .catch(() => {});
  }, []);

  // Phone input handler with strict formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("+998")) {
      val = "+998 ";
    }
    const cleanDigits = val.slice(4).replace(/\D/g, "").slice(0, 9);

    let formatted = "+998 ";
    if (cleanDigits.length > 0) {
      formatted += cleanDigits.slice(0, 2);
    }
    if (cleanDigits.length >= 3) {
      formatted += " " + cleanDigits.slice(2, 5);
    }
    if (cleanDigits.length >= 6) {
      formatted += " " + cleanDigits.slice(5, 7);
    }
    if (cleanDigits.length >= 8) {
      formatted += " " + cleanDigits.slice(7, 9);
    }

    setPhone(formatted);
    if (phoneError) setPhoneError("");
  };

  // Extract raw digits for length validation
  const getRawPhoneDigits = (ph: string) => {
    return ph.slice(4).replace(/\D/g, "");
  };

  const handleFormFocus = () => {
    trackEvent("form_started");
  };

  // Main Lead Submit Handler
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    let valid = true;
    setNameError("");
    setRegionError("");
    setPhoneError("");

    if (name.trim().length < 2) {
      setNameError(t.form.nameError);
      valid = false;
    }

    if (!region) {
      setRegionError(t.form.regionError);
      valid = false;
    }

    const rawDigits = getRawPhoneDigits(phone);
    if (rawDigits.length < 9) {
      setPhoneError(t.form.phoneError);
      valid = false;
    }

    if (!valid) return;

    setIsSubmitting(true);

    const generatedLeadId =
      "lead_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6);
    setLeadId(generatedLeadId);

    const leadPayload = {
      id: generatedLeadId,
      name: name.trim(),
      region,
      phone: phone.trim(),
      lang,
      source:
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("utm_source") || "direct"
          : "direct",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      timestamp: Date.now(),
    };

    // Save lead to LocalStorage queue for offline resilience
    try {
      const raw = localStorage.getItem("zotdor_leads_queue") || "[]";
      const queue = JSON.parse(raw);
      queue.push(leadPayload);
      localStorage.setItem("zotdor_leads_queue", JSON.stringify(queue));
      localStorage.setItem("zotdor_current_lead_id", generatedLeadId);
    } catch (err) {
      console.error("LocalStorage save error:", err);
    }

    // Try background API call and capture Supabase UUID
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });
      if (res.ok) {
        const data = await res.json();
        // Use the real Supabase UUID for PATCH survey updates
        if (data.supabase_id) {
          setLeadId(data.supabase_id);
          try {
            localStorage.setItem("zotdor_current_lead_id", data.supabase_id);
          } catch (_) {}
        }
      }
    } catch (err) {
      console.error("Fetch POST submit error:", err);
    }

    trackEvent("lead_submitted", { name, region, phone });
    trackEvent("survey_offered");

    setIsSubmitting(false);
    setSubmitted(true);
    setSurveyState("offered");
  };

  // Helper to send survey patch updates to Supabase/API
  const patchSurveyAnswers = async (
    status: "partial" | "complete",
    overrides: Record<string, any> = {}
  ) => {
    const activeLeadId =
      leadId ||
      (typeof window !== "undefined"
        ? localStorage.getItem("zotdor_current_lead_id") || ""
        : "");

    const patchData = {
      lead_id: activeLeadId,
      name,
      phone,
      role: overrides.role !== undefined ? overrides.role : role,
      animal_types:
        overrides.animalTypes !== undefined
          ? overrides.animalTypes
          : animalTypes,
      price_range:
        overrides.priceRange !== undefined ? overrides.priceRange : priceRange,
      pain_points:
        overrides.painPoints !== undefined ? overrides.painPoints : painPoints,
      preferred_platform:
        overrides.preferredPlatform !== undefined ? overrides.preferredPlatform : preferredPlatform,
      transaction_frequency:
        overrides.transactionFreq !== undefined ? overrides.transactionFreq : transactionFreq,
      comment: overrides.comment !== undefined ? overrides.comment : comment,
      survey_status: status,
    };

    try {
      await fetch("/api/submit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchData),
      });
    } catch (e) {
      console.error("Survey patch error:", e);
    }
  };

  // Question 1 Select
  const handleSelectRole = (selectedRole: string) => {
    setRole(selectedRole);
    trackEvent("survey_question_answered", { question: 1, value: selectedRole });
    patchSurveyAnswers("partial", { role: selectedRole });
    setCurrentQuestion(2);
  };

  // Question 2 Multi-select toggle
  const toggleAnimalType = (item: string) => {
    let updated: string[];
    if (animalTypes.includes(item)) {
      updated = animalTypes.filter((a) => a !== item);
    } else {
      updated = [...animalTypes, item];
    }
    setAnimalTypes(updated);
  };

  const handleNextQ2 = () => {
    trackEvent("survey_question_answered", {
      question: 2,
      value: animalTypes,
    });
    patchSurveyAnswers("partial", { animalTypes });
    setCurrentQuestion(3);
  };

  // Question 3 Select
  const handleSelectPriceRange = (range: string) => {
    setPriceRange(range);
    trackEvent("survey_question_answered", { question: 3, value: range });
    patchSurveyAnswers("partial", { priceRange: range });
    setCurrentQuestion(4);
  };

  // Question 4 Multi-select toggle
  const togglePainPoint = (point: string) => {
    let updated: string[];
    if (painPoints.includes(point)) {
      updated = painPoints.filter((p) => p !== point);
    } else {
      updated = [...painPoints, point];
    }
    setPainPoints(updated);
  };

  const handleNextQ4 = () => {
    trackEvent("survey_question_answered", {
      question: 4,
      value: painPoints,
    });
    patchSurveyAnswers("partial", { painPoints });
    setCurrentQuestion(5);
  };

  // Question 5 Select
  const handleSelectPlatform = (platform: string) => {
    setPreferredPlatform(platform);
    trackEvent("survey_question_answered", { question: 5, value: platform });
    patchSurveyAnswers("partial", { preferredPlatform: platform });
    setCurrentQuestion(6);
  };

  // Question 6 Select
  const handleSelectFrequency = (freq: string) => {
    setTransactionFreq(freq);
    trackEvent("survey_question_answered", { question: 6, value: freq });
    trackEvent("survey_completed");
    patchSurveyAnswers("complete", { transactionFreq: freq });
    setSurveyState("completed");
  };

  const handleDismissSurvey = () => {
    trackEvent("survey_dismissed", { questionAtDismiss: currentQuestion });
    patchSurveyAnswers("partial");
    setSurveyState("dismissed");
  };

  const handleFinalCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patchSurveyAnswers("complete", { comment });
    setSurveyState("dismissed");
  };

  return (
    <div
      id={`${idPrefix}-form-wrapper`}
      className="w-full bg-[#ffffff] rounded-2xl border-2 border-[#e8e2d5] shadow-lg overflow-hidden text-[#1c261e]"
    >
      {showTitleInCard && !submitted && (
        <div className="bg-[#1b3e2b] text-[#f7f4ee] px-6 py-4 border-b border-[#122b1e]">
          <h2 className="text-xl font-black">{t.secondCta.title}</h2>
        </div>
      )}

      {submitted ? (
        /* THANK YOU & OPTIONAL QUESTIONS SCREEN */
        <div className="p-6 sm:p-8 space-y-6">
          {surveyState === "offered" && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 bg-[#e8f0eb] text-[#1b3e2b] rounded-full flex items-center justify-center mx-auto border-2 border-[#1b3e2b]">
                <svg
                  className="w-10 h-10 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#1c261e]">
                  {t.thankYou.title.replace("{name}", name)}
                </h3>
                <p className="text-sm text-[#526054] font-medium mt-2 leading-relaxed">
                  {t.thankYou.subtitle}
                </p>
              </div>

              <hr className="border-[#e8e2d5]" />

              <div className="bg-[#f7f4ee] border border-[#d4cbba] p-5 rounded-2xl text-left space-y-3">
                <h4 className="text-base font-black text-[#1b3e2b]">
                  {t.thankYou.surveyOfferTitle}
                </h4>
                <p className="text-xs sm:text-sm text-[#526054] font-medium leading-relaxed">
                  {t.thankYou.surveyOfferDesc}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      trackEvent("survey_started");
                      setSurveyState("answering");
                      setCurrentQuestion(1);
                    }}
                    type="button"
                    className="w-full sm:w-auto min-h-touch px-6 py-3 bg-[#1b3e2b] hover:bg-[#122b1e] text-white font-extrabold text-sm rounded-xl transition-all active:scale-95 text-center"
                  >
                    {t.thankYou.startSurveyBtn}
                  </button>
                  <button
                    onClick={handleDismissSurvey}
                    type="button"
                    className="text-xs font-bold text-[#8c6f56] hover:text-[#4a3728] underline py-2"
                  >
                    {t.thankYou.laterLink}
                  </button>
                </div>
              </div>
            </div>
          )}

          {surveyState === "answering" && (
            <div className="space-y-5">
              {/* Top Bar: Progress and Close */}
              <div className="flex items-center justify-between pb-3 border-b border-[#e8e2d5]">
                <span className="text-xs font-black uppercase tracking-wider text-[#1b3e2b] bg-[#e8f0eb] px-3 py-1 rounded-full">
                  {t.thankYou.progress
                    .replace("{current}", currentQuestion.toString())
                    .replace("{total}", "6")}
                </span>
                <button
                  onClick={handleDismissSurvey}
                  type="button"
                  className="text-xs font-bold text-[#8c6f56] hover:text-[#1c261e] underline py-1"
                >
                  {t.thankYou.closeLink}
                </button>
              </div>

              {/* Question 1 */}
              {currentQuestion === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-[#1c261e]">
                    1. {t.thankYou.questions.q1Title}
                  </h3>
                  <div className="space-y-2.5">
                    {t.thankYou.questions.q1Options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectRole(opt)}
                        className={`w-full min-h-touch p-4 rounded-xl border-2 text-left font-bold text-sm sm:text-base transition-all active:scale-[0.99] flex items-center justify-between ${
                          role === opt
                            ? "bg-[#1b3e2b] text-white border-[#1b3e2b]"
                            : "bg-[#f7f4ee] hover:bg-[#e8e2d5] text-[#1c261e] border-[#e8e2d5]"
                        }`}
                      >
                        <span>{opt}</span>
                        <svg
                          className="w-5 h-5 text-current opacity-70"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 2 */}
              {currentQuestion === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-[#1c261e]">
                      2. {t.thankYou.questions.q2Title}
                    </h3>
                    <p className="text-xs text-[#526054] font-medium mt-0.5">
                      {t.thankYou.questions.q2Subtitle}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {t.thankYou.questions.q2Options.map((opt) => {
                      const isSelected = animalTypes.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleAnimalType(opt)}
                          className={`min-h-touch p-3.5 rounded-xl border-2 text-left font-bold text-sm flex items-center space-x-3 transition-all ${
                            isSelected
                              ? "bg-[#1b3e2b] text-white border-[#1b3e2b]"
                              : "bg-[#f7f4ee] hover:bg-[#e8e2d5] text-[#1c261e] border-[#e8e2d5]"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-white text-[#1b3e2b]"
                                : "border-[#8c6f56] bg-white"
                            }`}
                          >
                            {isSelected && (
                              <svg
                                className="w-3.5 h-3.5 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                              </svg>
                            )}
                          </div>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleNextQ2}
                    type="button"
                    className="w-full min-h-touch py-3.5 bg-[#1b3e2b] hover:bg-[#122b1e] text-white font-extrabold text-base rounded-xl transition-all active:scale-[0.98] mt-2"
                  >
                    {t.thankYou.nextBtn}
                  </button>
                </div>
              )}

              {/* Question 3 */}
              {currentQuestion === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-[#1c261e]">
                    3. {t.thankYou.questions.q3Title}
                  </h3>
                  <div className="space-y-2.5">
                    {t.thankYou.questions.q3Options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectPriceRange(opt)}
                        className={`w-full min-h-touch p-3.5 rounded-xl border-2 text-left font-bold text-sm sm:text-base transition-all flex items-center justify-between ${
                          priceRange === opt
                            ? "bg-[#1b3e2b] text-white border-[#1b3e2b]"
                            : "bg-[#f7f4ee] hover:bg-[#e8e2d5] text-[#1c261e] border-[#e8e2d5]"
                        }`}
                      >
                        <span>{opt}</span>
                        <svg
                          className="w-5 h-5 text-current opacity-70"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 4 */}
              {currentQuestion === 4 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-[#1c261e]">
                      4. {t.thankYou.questions.q4Title}
                    </h3>
                    <p className="text-xs text-[#526054] font-medium mt-0.5">
                      {t.thankYou.questions.q4Subtitle}
                    </p>
                  </div>
                  <div className="space-y-2.5">
                    {t.thankYou.questions.q4Options.map((opt) => {
                      const isSelected = painPoints.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => togglePainPoint(opt)}
                          className={`w-full min-h-touch p-3.5 rounded-xl border-2 text-left font-bold text-sm flex items-center space-x-3 transition-all ${
                            isSelected
                              ? "bg-[#1b3e2b] text-white border-[#1b3e2b]"
                              : "bg-[#f7f4ee] hover:bg-[#e8e2d5] text-[#1c261e] border-[#e8e2d5]"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-white text-[#1b3e2b]"
                                : "border-[#8c6f56] bg-white"
                            }`}
                          >
                            {isSelected && (
                              <svg
                                className="w-3.5 h-3.5 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                              </svg>
                            )}
                          </div>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleNextQ4}
                    type="button"
                    className="w-full min-h-touch py-3.5 bg-[#1b3e2b] hover:bg-[#122b1e] text-white font-extrabold text-base rounded-xl transition-all active:scale-[0.98] mt-2"
                  >
                    {t.thankYou.nextBtn}
                  </button>
                </div>
              )}

              {/* Question 5 */}
              {currentQuestion === 5 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-[#1c261e]">
                    5. {t.thankYou.questions.q5Title}
                  </h3>
                  <div className="space-y-2.5">
                    {t.thankYou.questions.q5Options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectPlatform(opt)}
                        className={`w-full min-h-touch p-3.5 rounded-xl border-2 text-left font-bold text-sm sm:text-base transition-all flex items-center justify-between ${
                          preferredPlatform === opt
                            ? "bg-[#1b3e2b] text-white border-[#1b3e2b]"
                            : "bg-[#f7f4ee] hover:bg-[#e8e2d5] text-[#1c261e] border-[#e8e2d5]"
                        }`}
                      >
                        <span>{opt}</span>
                        <svg
                          className="w-5 h-5 text-current opacity-70"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 6 */}
              {currentQuestion === 6 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-[#1c261e]">
                    6. {t.thankYou.questions.q6Title}
                  </h3>
                  <div className="space-y-2.5">
                    {t.thankYou.questions.q6Options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectFrequency(opt)}
                        className={`w-full min-h-touch p-3.5 rounded-xl border-2 text-left font-bold text-sm sm:text-base transition-all flex items-center justify-between ${
                          transactionFreq === opt
                            ? "bg-[#1b3e2b] text-white border-[#1b3e2b]"
                            : "bg-[#f7f4ee] hover:bg-[#e8e2d5] text-[#1c261e] border-[#e8e2d5]"
                        }`}
                      >
                        <span>{opt}</span>
                        <svg
                          className="w-5 h-5 text-current opacity-70"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {surveyState === "completed" && (
            <form onSubmit={handleFinalCommentSubmit} className="space-y-4 text-center">
              <div className="w-12 h-12 bg-[#e8f0eb] text-[#1b3e2b] rounded-full flex items-center justify-center mx-auto border border-[#1b3e2b]">
                <svg
                  className="w-7 h-7 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-black text-[#1c261e]">
                {t.thankYou.completed.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#526054] font-medium">
                {t.thankYou.completed.subtitle}
              </p>

              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.thankYou.completed.commentPlaceholder}
                className="w-full p-3.5 bg-[#f7f4ee] border-2 border-[#e8e2d5] focus:border-[#1b3e2b] focus:bg-white rounded-xl text-sm font-medium outline-none transition-colors"
              />

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full min-h-touch py-3 bg-[#1b3e2b] text-white font-bold text-sm rounded-xl hover:bg-[#122b1e]"
                >
                  {t.thankYou.completed.submitBtn}
                </button>
                <button
                  onClick={handleDismissSurvey}
                  type="button"
                  className="w-full min-h-touch py-3 bg-[#e8e2d5] text-[#1b3e2b] font-bold text-sm rounded-xl hover:bg-[#d4cbba]"
                >
                  {t.thankYou.completed.closeBtn}
                </button>
              </div>

              <hr className="border-[#e8e2d5] my-4" />

              <div className="pt-1">
                <p className="text-xs font-bold text-[#8c6f56] mb-2">
                  {t.thankYou.completed.shareText}
                </p>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(
                    typeof window !== "undefined"
                      ? window.location.href
                      : "https://zotdor.uz"
                  )}&text=${encodeURIComponent(
                    "Zotdor.uz — O'zbekistonning raqamli chorva bozori ro'yxatdan o'tish ochildi!"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#0088cc] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm hover:bg-[#0077b5] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.28c-.15.66-.54.82-1.09.51l-3.02-2.22-1.46 1.41c-.16.16-.3.3-.61.3l.22-3.09 5.63-5.09c.25-.22-.05-.34-.38-.12l-6.96 4.38-3-.94c-.65-.2-.67-.65.14-.97l11.71-4.51c.54-.2 1.02.13.84.96z" />
                  </svg>
                  <span>{t.thankYou.completed.shareTelegram}</span>
                </a>
              </div>
            </form>
          )}

          {surveyState === "dismissed" && (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 bg-[#e8f0eb] text-[#1b3e2b] rounded-full flex items-center justify-center mx-auto border-2 border-[#1b3e2b]">
                <svg
                  className="w-8 h-8 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-black text-[#1c261e]">
                {t.thankYou.title.replace("{name}", name)}
              </h3>
              <p className="text-sm text-[#526054] font-medium leading-relaxed max-w-sm mx-auto">
                {t.thankYou.subtitle}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSurveyState("idle");
                  setName("");
                  setPhone("+998 ");
                  setRegion("");
                }}
                type="button"
                className="mt-2 px-5 py-2.5 bg-[#e8e2d5] text-[#1b3e2b] font-bold text-xs rounded-xl hover:bg-[#d4cbba]"
              >
                Qayta ariza to'ldirish
              </button>
            </div>
          )}
        </div>
      ) : (
        /* INITIAL FORM: NAME, REGION, PHONE */
        <form
          onSubmit={handleSubmitLead}
          onFocus={handleFormFocus}
          className="p-5 sm:p-8 space-y-4"
        >
          {/* Name Field */}
          <div>
            <label
              htmlFor={`${idPrefix}-name-input`}
              className="block text-xs font-black uppercase tracking-wider text-[#1c261e] mb-1"
            >
              {t.form.nameLabel} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${idPrefix}-name-input`}
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError("");
              }}
              placeholder={t.form.namePlaceholder}
              className={`w-full min-h-touch px-4 py-3 bg-[#f7f4ee] border-2 ${
                nameError ? "border-red-500 bg-red-50" : "border-[#e8e2d5]"
              } focus:border-[#1b3e2b] focus:bg-white text-[#1c261e] font-bold text-base rounded-xl outline-none transition-colors`}
            />
            {nameError && (
              <p className="text-xs font-bold text-red-600 mt-1">
                {nameError}
              </p>
            )}
          </div>

          {/* Region Field */}
          <div>
            <label
              htmlFor={`${idPrefix}-region-select`}
              className="block text-xs font-black uppercase tracking-wider text-[#1c261e] mb-1"
            >
              {t.form.regionLabel} <span className="text-red-600">*</span>
            </label>
            <select
              id={`${idPrefix}-region-select`}
              required
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                if (regionError) setRegionError("");
              }}
              className={`w-full min-h-touch px-4 py-3 bg-[#f7f4ee] border-2 ${
                regionError ? "border-red-500 bg-red-50" : "border-[#e8e2d5]"
              } focus:border-[#1b3e2b] focus:bg-white text-[#1c261e] font-bold text-base rounded-xl outline-none transition-colors`}
            >
              <option value="">{t.form.regionPlaceholder}</option>
              {t.regions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
            {regionError && (
              <p className="text-xs font-bold text-red-600 mt-1">
                {regionError}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor={`${idPrefix}-phone-input`}
              className="block text-xs font-black uppercase tracking-wider text-[#1c261e] mb-1"
            >
              {t.form.phoneLabel} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${idPrefix}-phone-input`}
              type="tel"
              inputMode="tel"
              required
              value={phone}
              onChange={handlePhoneChange}
              placeholder={t.form.phonePlaceholder}
              className={`w-full min-h-touch px-4 py-3 bg-[#f7f4ee] border-2 ${
                phoneError ? "border-red-500 bg-red-50" : "border-[#e8e2d5]"
              } focus:border-[#1b3e2b] focus:bg-white text-[#1c261e] font-black text-lg rounded-xl outline-none transition-colors tracking-wider font-mono`}
            />
            {phoneError && (
              <p className="text-xs font-bold text-red-600 mt-1">
                {phoneError}
              </p>
            )}
          </div>

          {/* Submit Button (min 48px height, high contrast) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-touch py-4 px-6 bg-[#1b3e2b] hover:bg-[#122b1e] active:scale-[0.98] text-[#f7f4ee] font-black text-lg sm:text-xl rounded-xl shadow-md border-2 border-[#122b1e] transition-all disabled:opacity-75 flex items-center justify-center space-x-2 mt-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="w-5 h-5 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>{t.form.submitting}</span>
              </>
            ) : (
              <span>{t.form.submitBtn}</span>
            )}
          </button>

          {/* Small Trust Note under button */}
          <p className="text-[11px] sm:text-xs text-[#526054] font-medium text-center leading-normal pt-1">
            {t.form.trustNote}
          </p>

          {/* Registered count badge (only if count >= 50) */}
          {registeredCount >= 50 && (
            <div className="pt-2 text-center">
              <span className="inline-flex items-center space-x-1.5 bg-[#e8f0eb] border border-[#2d5a3f]/20 px-3 py-1 rounded-full text-xs font-bold text-[#1b3e2b]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>
                  {t.form.registeredCount.replace(
                    "{count}",
                    registeredCount.toString()
                  )}
                </span>
              </span>
            </div>
          )}
        </form>
      )}
    </div>
  );
};
