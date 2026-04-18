import { motion } from "framer-motion";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import PageContainer from "./PageContainer";
import SiteFooter from "./SiteFooter";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/projects", label: "项目" },
  { to: "/articles", label: "文章" },
  { to: "/user", label: "用户中心" },
];

const navItemClass =
  "relative rounded-2xl px-4 py-2.5 text-sm font-medium transition duration-300";

function NavigationLink({ item, mobile = false }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `${mobile ? "whitespace-nowrap " : ""}${navItemClass} ${
          isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <motion.span
              layoutId={mobile ? "mobile-nav-pill" : "nav-pill"}
              className="absolute inset-0 rounded-2xl bg-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
            />
          ) : null}
          <motion.span
            className="absolute inset-0 rounded-2xl bg-slate-100 opacity-0"
            whileHover={{ opacity: isActive ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <span className="relative z-10">{item.label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen">
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isHome
            ? "border-b border-slate-200/70 bg-white/82 shadow-[0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl"
            : "border-b border-slate-200/80 bg-white/90 shadow-[0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl"
        }`}
      >
        <PageContainer className="flex min-h-[76px] items-center justify-between gap-6">
          <NavLink to="/" className="group flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-950 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition duration-200 group-hover:-translate-y-0.5">
              DS
            </div>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold tracking-[-0.02em] text-slate-950">
                DarkSec
              </p>
              <p className="truncate text-[11px] uppercase tracking-[0.24em] text-slate-500">
                Developer Community
              </p>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-1 rounded-[20px] border border-slate-200/80 bg-white/88 p-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_rgba(15,23,42,0.04)] md:flex">
            {navItems.map((item) => (
              <NavigationLink key={item.to} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <NavLink to="/login" className="hidden sm:block">
              <Button variant="secondary">登录</Button>
            </NavLink>
            <NavLink to="/register">
              <Button>注册 / 入驻</Button>
            </NavLink>
          </div>
        </PageContainer>

        <PageContainer className="pb-3 md:hidden">
          <nav className="flex gap-2 overflow-x-auto rounded-[20px] border border-slate-200/80 bg-white/88 p-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_rgba(15,23,42,0.04)]">
            {navItems.map((item) => (
              <NavigationLink key={item.to} item={item} mobile />
            ))}
          </nav>
        </PageContainer>
      </header>

      <main
        className={
          isAuthPage
            ? "flex min-h-[calc(100vh-76px)] items-center pb-12 pt-8 sm:pb-16 sm:pt-10"
            : `pb-14 ${isHome ? "pt-5 sm:pt-6" : "pt-6 sm:pt-8"}`
        }
      >
        <Outlet />
      </main>

      {isAuthPage ? null : <SiteFooter />}
    </div>
  );
}
