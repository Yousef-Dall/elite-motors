import React from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP = "96800000000"; // no plus, no spaces
const TEXT = encodeURIComponent("Hi Elite Motors, I'd like to book a consultation.");

export default function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=${TEXT}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center h-12 w-12 rounded-full
                 border border-black/10 bg-green-500 text-white shadow-lg hover:scale-105 transition"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
