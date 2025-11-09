// src/components/layout/MotionSection.jsx
import React, { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const MotionSection = forwardRef(function MotionSection(
  { as: Tag = "section", id, className = "", children, ...rest },
  ref
) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } } }
    : { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

  return (
    <motion.div variants={variants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
      <Tag id={id} ref={ref} className={`scroll-offset ${className}`} {...rest}>{children}</Tag>
    </motion.div>
  );
});

export default MotionSection;
