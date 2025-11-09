import React from "react";

export default function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={[
        "mt-1 w-full px-3 py-2 rounded-xl border outline-none",
        "bg-white text-neutral-900 placeholder-neutral-500",
        "dark:bg-neutral-900 dark:text-white dark:placeholder-white/50",
        "border-black/10 dark:border-white/10 focus:border-cyan-400",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
