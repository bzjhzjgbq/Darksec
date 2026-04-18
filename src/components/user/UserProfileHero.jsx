import { motion, useReducedMotion } from "framer-motion";
import Badge from "../ui/Badge";

export default function UserProfileHero({ user }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="surface-strong relative overflow-hidden px-6 py-7 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute left-8 top-12 h-32 w-32 rounded-full bg-sky-100/45 blur-3xl" />
      </div>

      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="flex items-start gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-20 w-20 rounded-3xl object-cover ring-1 ring-slate-200"
          />
          <div className="min-w-0">
            <p className="eyebrow">Developer Profile</p>
            <motion.h1
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 text-[34px] font-semibold tracking-[-0.05em] text-slate-950"
            >
              {user.name}
            </motion.h1>
            <p className="mt-1 text-sm font-medium text-slate-600">{user.role}</p>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">{user.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {user.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-slate-500">
          <div className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3 text-right shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
            <p>{user.location}</p>
            <p className="mt-1">{user.website}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
