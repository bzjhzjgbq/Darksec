import { motion, useReducedMotion } from "framer-motion";

export default function Card({ children, strong = false, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: strong ? -3 : -4 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className={`${strong ? "surface-strong" : "surface"} card-motion ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}
