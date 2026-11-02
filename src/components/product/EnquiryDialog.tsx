"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";

const enquirySchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  modelNumber: z.string().optional(),
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid business email"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  country: z.string().min(2, "Country is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  // Honeypot field (hidden from real users)
  website_field: z.string().max(0, "Spam detected"),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface EnquiryDialogProps {
  productName: string;
  modelNumber?: string;
  triggerButton?: React.ReactNode;
}

export function EnquiryDialog({
  productName,
  modelNumber,
  triggerButton,
}: EnquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      productName,
      modelNumber: modelNumber || "",
      name: "",
      email: "",
      phone: "",
      company: "",
      country: "UAE",
      message: `Hello, I would like to request an official quote and product demonstration for the ${productName}.`,
      website_field: "",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Unable to submit enquiry. Please try again.");
      }

      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { setOpen(v); if (!v) setIsSuccess(false); }}>
      <Dialog.Trigger asChild>
        {triggerButton || (
          <button className="btn-primary w-full sm:w-auto">
            Request A Quote
          </button>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 sm:p-8 shadow-2xl focus:outline-none max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <Dialog.Close asChild>
            <button
              aria-label="Close dialog"
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </Dialog.Close>

          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <Dialog.Title className="text-2xl font-bold text-slate-900">
                Enquiry Received
              </Dialog.Title>
              <Dialog.Description className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for your interest in the <strong>{productName}</strong>. Our regional technical sales specialist will contact you within 24 business hours.
              </Dialog.Description>
              <button
                onClick={() => setOpen(false)}
                className="btn-primary mt-4"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div>
                <Dialog.Title className="text-2xl font-bold text-slate-900">
                  Request a Formal Quote
                </Dialog.Title>
                <Dialog.Description className="text-xs text-slate-500 mt-1">
                  Enquiring for: <span className="font-semibold text-[rgb(196,30,58)]">{productName}</span> {modelNumber && `(${modelNumber})`}
                </Dialog.Description>
              </div>

              {errorMsg && (
                <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                {/* Honeypot field (hidden from view) */}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="w-full text-xs font-medium rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-[rgb(196,30,58)] focus:outline-none focus:ring-1 focus:ring-[rgb(196,30,58)]"
                      placeholder="Ahmed Al-Maktoum"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      className="w-full text-xs font-medium rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-[rgb(196,30,58)] focus:outline-none focus:ring-1 focus:ring-[rgb(196,30,58)]"
                      placeholder="ahmed@company.ae"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      className="w-full text-xs font-medium rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-[rgb(196,30,58)] focus:outline-none focus:ring-1 focus:ring-[rgb(196,30,58)]"
                      placeholder="Emirates Packaging Ltd"
                      {...register("company")}
                    />
                    {errors.company && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.company.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="w-full text-xs font-medium rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-[rgb(196,30,58)] focus:outline-none focus:ring-1 focus:ring-[rgb(196,30,58)]"
                      placeholder="+971 50 000 0000"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Country / Region *
                  </label>
                  <select
                    className="w-full text-xs font-medium rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-[rgb(196,30,58)] focus:outline-none focus:ring-1 focus:ring-[rgb(196,30,58)] bg-white"
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Requirements / Message *
                  </label>
                  <textarea
                    rows={3}
                    className="w-full text-xs font-medium rounded-xl border border-slate-200 p-3 focus:border-[rgb(196,30,58)] focus:outline-none focus:ring-1 focus:ring-[rgb(196,30,58)] resize-none"
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
                        Submitting Enquiry...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Request
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2">
                    Direct enquiry routed to Phoenix Colour Technologies regional desk.
                  </p>
                </div>
              </form>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

