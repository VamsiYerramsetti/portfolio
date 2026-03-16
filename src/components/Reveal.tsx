"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "./utils";

/**
 * Reveal: subtle, premium scroll-triggered animation.
 * Keeps animations to transform+opacity for smooth 60fps.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  hoverLift = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverLift?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const content = hoverLift ? (
    <motion.div
      whileHover={{ y: -hoverLift }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.div>
  ) : (
    children
  );

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ y: 18, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {content}
    </motion.div>
  );
}
