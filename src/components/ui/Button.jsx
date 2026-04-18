import { motion, useReducedMotion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  size = "md",
  ...props
}) {
  const reduceMotion = useReducedMotion();

  const sizes = {
    sm: "h-10 px-3.5 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-5 text-sm",
  };

  const variants = {
    primary:
      "button-animated inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f172a_0%,#0f172a_58%,#115e59_100%)] bg-[length:150%_150%] bg-[position:0%_50%] font-medium text-white shadow-[0_1px_2px_rgba(15,23,42,0.08),0_10px_24px_rgba(15,23,42,0.08)] transition duration-300 hover:bg-[position:100%_50%] focus-visible:shadow-[0_0_0_4px_rgba(15,23,42,0.08)] disabled:pointer-events-none disabled:opacity-60",
    secondary:
      "button-animated inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_58%,#f0fdfa_100%)] bg-[length:160%_160%] bg-[position:0%_50%] font-medium text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition duration-300 hover:border-slate-300 hover:bg-[position:100%_50%] hover:text-slate-900 focus-visible:shadow-[0_0_0_4px_rgba(148,163,184,0.12)] disabled:pointer-events-none disabled:opacity-60",
    ghost:
      "button-animated inline-flex items-center justify-center rounded-2xl font-medium text-slate-600 transition duration-300 hover:bg-slate-100 hover:text-slate-900 focus-visible:bg-slate-100 focus-visible:text-slate-900 disabled:pointer-events-none disabled:opacity-60",
  };

  return (
    <motion.button
      type={type}
      whileHover={reduceMotion ? undefined : { y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={`${variants[variant]} ${sizes[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </motion.button>
  );
}
