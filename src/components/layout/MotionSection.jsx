// src/components/ui/MotionSection.jsx
import React, { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * MotionSection
 *
 * Usage:
 * <MotionSection id="about" className="scroll-offset py-20">
 *   <About />
 * </MotionSection>
 *
 * Props:
 * - as: which HTML tag to render for the actual content (defaults to <section>)
 * - id: section id (anchors / nav)
 * - className: classes applied to the rendered tag
 * - children: content
 *
 * Behavior:
 * - wraps your section in a motion.div that fades/slides in on scroll
 * - respects prefers-reduced-motion
 * - sets viewport={{ once: true }} so each section animates only first time
 */
const MotionSection = forwardRef(function MotionSection(
  { as: Tag = "section", id, className = "", children, ...rest },
  ref
) {
  const prefersReduced = useReducedMotion();

  const variants = prefersReduced
    ? {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: "easeOut" },
        },
      };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.25, // trigger when ~25% of section is in view
      }}
    >
      <Tag
        id={id}
        ref={ref}
        className={`scroll-offset ${className}`}
        {...rest}
      >
        {children}
      </Tag>
    </motion.div>
  );
});

export default MotionSection;


