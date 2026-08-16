"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  ArrowUpRight,
  Mail,
  MessageSquare,
  CheckCircle2,
  X,
  Send,
  Building,
  Phone,
  User,
  Clock,
  DollarSign,
  Briefcase,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Web Development",
    budget: "$1,000 – $2,500",
    timeline: "ASAP",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

  useEffect(() => {
    if (submitError) {
      const timer = setTimeout(() => {
        setSubmitError(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [submitError]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Please describe your project details";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      fullName: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      service: formData.service,
      timeline: formData.timeline,
      budget: formData.budget,
      description: formData.message.trim(),
    };

    const ENDPOINT =
      "https://script.google.com/macros/s/AKfycbxnxXMQOhp7NcD-jjS7G8DPjifEaIQGO_ee6Fm4zdZayS6Ga00tufIb67YSsIoFeaQoSQ/exec";

    try {
      // Send request to Google Apps Script Web App endpoint
      let responseOk = false;
      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
        });
        if (response.ok || response.type === "opaque" || response.status === 200) {
          responseOk = true;
        }
      } catch {
        // Fallback for strict browser CORS handling on 302 redirects
        await fetch(ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
        });
        responseOk = true;
      }

      if (!responseOk) {
        throw new Error("Google Apps Script endpoint returned an error.");
      }

      // Persist local submission backup
      try {
        const submission = {
          id: `sub_${Date.now()}`,
          ...payload,
          submittedAt: new Date().toISOString(),
        };
        const existingRaw = localStorage.getItem("aktech_contact_submissions");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        existing.unshift(submission);
        localStorage.setItem("aktech_contact_submissions", JSON.stringify(existing));
      } catch (storageErr) {
        console.warn("Local backup failed:", storageErr);
      }

      // Clear / reset form fields
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "Web Development",
        budget: "$1,000 – $2,500",
        timeline: "ASAP",
        message: "",
      });

      // Trigger top-right success toast
      setShowSuccessToast(true);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(
        "Failed to send your project request. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111111] pt-36 sm:pt-40 pb-20 selection:bg-[#E0000B]/20 selection:text-[#E0000B] overflow-x-hidden">
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">

        {/* ═════════════════════════════════════════════════════════════
            1. HERO INTRO (BREATHING ROOM AFTER NAVBAR)
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-16 sm:mb-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full bg-white border border-black/10 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#E0000B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#111111]">
              START A PROJECT
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-4xl"
          >
            <h1 className="font-heading font-extrabold text-5xl sm:text-7xl lg:text-8xl text-[#111111] tracking-tight leading-[1.02] uppercase mb-6">
              LET&apos;S BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#E0000B] to-[#111111]">
                SOMETHING GREAT.
              </span>
            </h1>

            <p className="text-gray-600 text-lg sm:text-2xl font-normal leading-relaxed">
              Have an idea, product or business problem? Let&apos;s turn it into something that works. Fill out the form below or contact us directly.
            </p>
          </motion.div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            2. CONTACT FORM & DIRECT INFO GRID
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* LEFT: FORM (8 COLS) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-8 bg-white border border-black/10 rounded-[2.5rem] p-8 sm:p-12 shadow-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border text-sm text-[#111111] font-medium outline-none transition-all ${
                          errors.name ? "border-[#E0000B] bg-red-50/50" : "border-black/10 focus:border-[#111111] focus:bg-white"
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-[#E0000B] mt-1 font-semibold">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border text-sm text-[#111111] font-medium outline-none transition-all ${
                          errors.email ? "border-[#E0000B] bg-red-50/50" : "border-black/10 focus:border-[#111111] focus:bg-white"
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-[#E0000B] mt-1 font-semibold">{errors.email}</p>}
                  </div>
                </div>

                {/* Row 2: Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                      Phone / WhatsApp (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-black/10 text-sm text-[#111111] font-medium outline-none focus:border-[#111111] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                      Company Name (Optional)
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Corp"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-black/10 text-sm text-[#111111] font-medium outline-none focus:border-[#111111] focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Service Required & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                      Service Required
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-black/10 text-sm text-[#111111] font-medium outline-none focus:border-[#111111] focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Apps">Mobile Apps</option>
                        <option value="AI Agents & Automation">AI Agents &amp; Automation</option>
                        <option value="CRM & Business Systems">CRM &amp; Business Systems</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="SEO & Digital Growth">SEO &amp; Digital Growth</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                      Project Timeline
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-black/10 text-sm text-[#111111] font-medium outline-none focus:border-[#111111] focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="ASAP">ASAP (Immediate)</option>
                        <option value="1–2 Weeks">1–2 Weeks</option>
                        <option value="1 Month">Within 1 Month</option>
                        <option value="2+ Months">2+ Months</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Budget Range Radio Options */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#E0000B]" />
                    <span>Estimated Budget Range</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Under $500",
                      "$500 – $1,000",
                      "$1,000 – $2,500",
                      "$2,500 – $5,000",
                      "$5,000+"
                    ].map((budgetOption) => {
                      const isSelected = formData.budget === budgetOption;
                      return (
                        <button
                          key={budgetOption}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: budgetOption })}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#111111] text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-black/5"
                          }`}
                        >
                          {budgetOption}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                    Describe Your Project *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your business goals, target audience, technical requirements, or idea..."
                    className={`w-full p-4 rounded-2xl bg-gray-50 border text-sm text-[#111111] font-medium outline-none transition-all resize-none ${
                      errors.message ? "border-[#E0000B] bg-red-50/50" : "border-black/10 focus:border-[#111111] focus:bg-white"
                    }`}
                  />
                  {errors.message && <p className="text-xs text-[#E0000B] mt-1 font-semibold">{errors.message}</p>}
                </div>

                {submitError && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center justify-between">
                    <span>{submitError}</span>
                    <button
                      type="button"
                      onClick={() => setSubmitError(null)}
                      className="text-red-500 hover:text-red-800 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-full bg-[#E0000B] text-white font-heading font-bold text-sm tracking-widest uppercase shadow-[0_10px_35px_rgba(224,0,11,0.4)] hover:bg-[#C00009] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Send Project Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            </motion.div>

            {/* RIGHT: DIRECT CONTACT CARDS (4 COLS) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-4 space-y-6"
            >
              {/* Card 1: Official Email */}
              <div className="bg-[#111111] text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-[#E0000B]/20 border border-[#E0000B]/30 flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6 text-[#E0000B]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-2 block">
                  OFFICIAL EMAIL
                </span>
                <h3 className="font-heading font-extrabold text-2xl mb-2 text-white lowercase">
                  hello@aktech.tech
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 font-normal">
                  Send us your RFPs, project briefs, or technical inquiries directly.
                </p>
                <a
                  href="mailto:hello@aktech.tech"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#E0000B] text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Send Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Card 2: WhatsApp Instant Chat */}
              <div className="bg-white border border-black/10 p-8 rounded-[2rem] shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-600 mb-2 block">
                  INSTANT WHATSAPP
                </span>
                <h3 className="font-heading font-extrabold text-xl text-[#111111] mb-2">
                  +92 371 3410797
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-6 font-normal">
                  Need quick answers or instant project estimation? Chat with our lead engineer.
                </p>
                <a
                  href="https://wa.me/923713410797"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-green-600 text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Open WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Card 3: Response Time Guarantee */}
              <div className="bg-[#F1F5F9] border border-black/5 p-6 rounded-2xl flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-[#E0000B] shrink-0" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#111111]">
                    24-Hour Response SLA
                  </h4>
                  <p className="text-gray-500 text-xs mt-0.5">
                    We review and reply to every project request within 24 business hours.
                  </p>
                </div>
              </div>

              {/* Card 4: Official Social Media Channels */}
              <div className="bg-white border border-black/10 p-6 rounded-2xl shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E0000B] mb-3 block">
                  OFFICIAL SOCIAL MEDIA
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={siteConfig.links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-[#111111] hover:text-white transition-all text-xs font-bold text-[#111111] group"
                  >
                    <span>Facebook</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E0000B] transition-colors" />
                  </a>

                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-[#111111] hover:text-white transition-all text-xs font-bold text-[#111111] group"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E0000B] transition-colors" />
                  </a>

                  <a
                    href={siteConfig.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-[#111111] hover:text-white transition-all text-xs font-bold text-[#111111] group"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E0000B] transition-colors" />
                  </a>

                  <a
                    href={siteConfig.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-[#111111] hover:text-white transition-all text-xs font-bold text-[#111111] group"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E0000B] transition-colors" />
                  </a>
                </div>
              </div>

            </motion.div>

          </div>
        </section>

      </div>

      {/* ═════════════════════════════════════════════════════════════
          3. PREMIUM FLOATING TOP-RIGHT TOAST NOTIFICATION
         ═════════════════════════════════════════════════════════════ */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[300] flex flex-col gap-3 max-w-sm w-[calc(100vw-2rem)] sm:w-[380px] pointer-events-none">
        <AnimatePresence mode="sync">
          {showSuccessToast && (
            <motion.div
              key="success-toast"
              initial={{ opacity: 0, y: -25, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, x: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle top red accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E0000B] via-[#FF3B45] to-[#E0000B]" />

              <div className="flex items-start gap-3.5">
                {/* Animated Checkmark Icon Badge */}
                <div className="w-10 h-10 rounded-full bg-[#E0000B]/10 border border-[#E0000B]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.1 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#E0000B]" />
                  </motion.div>
                </div>

                {/* Toast Content */}
                <div className="flex-1 pr-5">
                  <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#111111] uppercase tracking-wide">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mt-1 font-normal">
                    Your project request has been received. We&apos;ll get back to you soon.
                  </p>
                </div>

                {/* Small Close Button */}
                <button
                  type="button"
                  onClick={() => setShowSuccessToast(false)}
                  className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-gray-400 hover:text-[#111111] hover:bg-black/5 transition-colors cursor-pointer"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {submitError && (
            <motion.div
              key="error-toast"
              initial={{ opacity: 0, y: -25, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, x: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-red-200 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500" />
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0 mt-0.5 text-red-600">
                  <X className="w-5 h-5" />
                </div>
                <div className="flex-1 pr-5">
                  <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#111111] uppercase tracking-wide">
                    Submission Error
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mt-1 font-normal">
                    {submitError}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitError(null)}
                  className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-gray-400 hover:text-[#111111] hover:bg-black/5 transition-colors cursor-pointer"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
