import { motion, useReducedMotion } from "framer-motion";

const motionTags = {
  article: motion.article,
  div: motion.div,
  section: motion.section,
};

export default function Reveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  amount = 0.2,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const Component = motionTags[as] || motion.div;

  return (
    <Component
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
