import React from "react";
import { MessageCircle } from "lucide-react";

// --- Configuration ---
const WHATSAPP = "96800000000"; // no plus, no spaces
const TEXT = encodeURIComponent(
  "Hi Elite Motors, I'd like to book a consultation."
);

export default function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=${TEXT}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40
                 inline-flex items-center justify-center h-12 w-12 md:h-14 md:w-14
                 rounded-full border border-black/10 dark:border-white/10
                 bg-green-500 text-white shadow-lg shadow-green-500/20
                 hover:scale-110 hover:shadow-green-500/40
                 transition-transform duration-300 ease-out"
    >
      <MessageCircle className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
    </a>
  );
}

