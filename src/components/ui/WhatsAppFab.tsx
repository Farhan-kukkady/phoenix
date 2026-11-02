"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppFabProps {
  phoneNumber: string;
}

export function WhatsAppFab({ phoneNumber }: WhatsAppFabProps) {
  const href = `https://wa.me/${phoneNumber}?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20Phoenix%20Colour%20Technologies%20products.`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
    >
      <MessageCircle className="w-7 h-7" fill="white" />
    </a>
  );
}
