import React from "react";

export default function Button({
  as: Tag = "button",
  className = "",
  gradient = false,
  children,
  ...rest
}) {
  const base = "inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold transition";
  const filled = gradient
    ? "text-white bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 shadow-lg hover:opacity-95"
    : "text-neutral-900 bg-white/70 border border-black/10 hover:bg-white/90 dark:text-white dark:bg-white/5 dark:border-white/10";
  return (
    <Tag className={`${base} ${filled} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
