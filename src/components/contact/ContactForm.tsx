"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid business email"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  country: z.string().min(2, "Country is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website_field: z.string().max(0, "Spam detected"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      country: "UAE",
      subject: "General Consultation",
      message: "",
      website_field: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Unable to submit message. Please try again.");
      }

      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="py-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Message Delivered</h3>
        <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out to Phoenix Colour Technologies. One of our regional engineers will follow up with you promptly.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="btn-primary mt-4"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_field">Leave empty</label>
        <input
          id="website_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website_field")}
        />
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            className="w-full text-xs font-medium rounded-xl border border-slate-200 p-3 focus:border-[rgb(196,30,58)] focus:outline-none focus:ring-1 focus:ring-[rgb(196,30,58)]"
            placeholder="Mohamed Al-Nuaimi"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-[11px] text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Corporate Email *
          </label>
          <input
            type="email"
            className="w-full text-xs font-medium rounded-xl border border-slate-200 p-3 focus:border-[rgb(196,30,58)] focus:outline-none focus:ring-1 focus:ring-[rgb(196,30,58)]"
            placeholder="m.nuaimi@company.ae"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Company Name *
          </label>
          <input
            type="text"
            className="w-full text-xs font-medium rounded-xl border border-slate-200 p-3 focus:border-[rgb(196,30,58)] focus:outline-none focus:ring-1 focus:ring-[rgb(196,30,58)]"
            placeholder="Gulf Converting Industries"
            {...register("company")}
          />
          {errors.company && (
            <p className="text-[11px] text-red-500 mt-1">{errors.company.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Phone / Mobile *
          </label>
          <input
            type="tel"
            className="w-full text-xs font-medium rounded-xl border border-slate-200 p-3 focus:border-[rgb(196,30,58)] focus:outline-none focus:ring-1 focus:ring-[rgb(196,30,58)]"
            placeholder="+971 4 000 0000"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-[11px] text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Country / Region *
          </label>
          <select
            className="w-full text-xs font-medium rounded-xl border border-slate-200 p-3 focus:border-[rgb(196,30,58)] focus:outline-none focus:ring-1 focus:ring-[rgb(196,30,58)] bg-white"
            {...register("country")}
          >
            <option value="UAE">United Arab Emirates</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Qatar">Qatar</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Oman">Oman</option>
            <option value="Egypt">Egypt</option>
            <option value="Other">Other Region / Africa</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Subject of Enquiry *
          </label>
          <select
            className="w-full text-xs font-medium rounded-xl border border-slate-200 p-3 focus:border-[rgb(196,30,58)] focus:outline-none focus:ring-1 focus:ring-[rgb(196,30,58)] bg-white"
            {...register("subject")}
          >
            <option value="General Consultation">General Consultation</option>
            <option value="Product Quote">Product Quotation</option>
            <option value="G7 Certification">G7 Press Certification</option>
            <option value="Instrument Calibration">Instrument Calibration & Service</option>
            <option value="IoT Shopfloor">IoT Shopfloor Platform</option>
            <option value="AMC Contracts">Annual Maintenance Contracts</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Detailed Message *
        </label>
        <textarea
          rows={4}
          className="w-full text-xs font-medium rounded-xl border border-slate-200 p-3 focus:border-[rgb(196,30,58)] focus:outline-none focus:ring-1 focus:ring-[rgb(196,30,58)] resize-none"
          placeholder="Please describe your current equipment, application, and specific requirements..."
          {...register("message")}
        />
        {errors.message && (
          <p className="text-[11px] text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full justify-center disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting Message...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Official Inquiry
            </>
          )}
        </button>
      </div>
    </form>
  );
}

