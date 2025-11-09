import React, { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle, Navigation } from "lucide-react";
import { CONTACT } from "../../constants/contact";

const WA_TEXT = encodeURIComponent("Hi Elite Motors, I'd like to inquire about your services.");

export default function MobileQuickBar() {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const dy = y - lastY.current;
        if (y < 24) setVisible(true);
        else {
          if (dy > 6) setVisible(false);
          else if (dy < -6) setVisible(true);
        }
        lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const safePad = { paddingBottom: "max(env(safe-area-inset-bottom, 0px), 8px)" };

  return (
    <div
      style={safePad}
      className={[
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "transition-transform duration-[250ms] ease-out will-change-transform",
        visible ? "translate-y-0" : "translate-y-full"
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 py-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur border-t border-black/10 dark:border-white/10 rounded-t-2xl shadow-[0_-6px_20px_rgba(0,0,0,0.12)]">
        <div className="grid grid-cols-3 gap-3">
          <a href={`tel:${CONTACT.PHONE_TEL}`} className="flex flex-col items-center justify-center gap-1 py-1 text-sm text-neutral-700 dark:text-white">
            <Phone className="h-5 w-5" /><span>Call</span>
          </a>
          <a href={`https://wa.me/${CONTACT.WHATSAPP}?text=${WA_TEXT}`} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-1 py-1 text-sm text-neutral-700 dark:text-white">
            <MessageCircle className="h-5 w-5" /><span>WhatsApp</span>
          </a>
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${CONTACT.MAPS_QUERY}`} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-1 py-1 text-sm text-neutral-700 dark:text-white">
            <Navigation className="h-5 w-5" /><span>Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
