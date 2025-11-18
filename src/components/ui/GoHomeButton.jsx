import React from "react";
import { ArrowLeft } from "lucide-react";

const primaryButtonClasses =
  "group inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition";

export default function GoHomeButton({
  label = "Back to home",
  href = "/#home",
}) {
  return (
    <div className="mt-12 flex justify-center">
      <a href={href} className={primaryButtonClasses}>
        <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
        <span>{label}</span>
      </a>
    </div>
  );
}
