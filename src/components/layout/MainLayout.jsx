import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PageContainer from "./PageContainer";
import SiteFooter from "./SiteFooter";
import MainNavbar from "./MainNavbar";

export default function MainLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isUserArea = location.pathname.startsWith("/user");
  const isCompetitionPage = location.pathname.startsWith("/competitions");
  const { isLoggedIn, currentUser } = useAuth();

  return (
    <div className={isCompetitionPage ? "min-h-screen bg-[#161d1a]" : "min-h-screen"}>
      <header
        className={`sticky top-0 z-30 border-b ${
          isCompetitionPage
            ? "border-[#2b3531] bg-[#1a211f]/92 backdrop-blur-xl shadow-none"
            : "border-slate-200/80 bg-white/96 shadow-[0_1px_0_rgba(255,255,255,0.9)]"
        }`}
      >
        <PageContainer className="flex flex-wrap items-center justify-between gap-6">
          <NavLink to="/home" className="group flex min-w-0 items-center gap-3 py-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold transition duration-200 group-hover:-translate-y-0.5 ${
                isCompetitionPage
                  ? "border-[#34423d] bg-[#101613] text-[#edf4ef]"
                  : "border-slate-200 bg-slate-950 text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
              }`}
            >
              DS
            </div>
            <div className="min-w-0">
              <p
                className={`truncate text-[15px] font-semibold tracking-[-0.02em] ${
                  isCompetitionPage ? "text-[#eef5f0]" : "text-slate-950"
                }`}
              >
                DarkSec
              </p>
              <p
                className={`truncate text-[11px] tracking-[0.22em] ${
                  isCompetitionPage ? "text-[#80938a]" : "text-slate-500"
                }`}
              >
                南京信息工程大学校园社区
              </p>
            </div>
          </NavLink>

          <MainNavbar
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            hideNavigation={isUserArea || isAuthPage}
            theme={isCompetitionPage ? "competition" : "default"}
          />
        </PageContainer>
      </header>

      <main
        className={
          isCompetitionPage
            ? "min-h-[calc(100vh-76px)] bg-[#161d1a] pb-0 pt-0"
            : isAuthPage
              ? "flex min-h-[calc(100vh-76px)] items-center pb-12 pt-8 sm:pb-16 sm:pt-10"
              : isUserArea
                ? "min-h-[calc(100vh-76px)] pb-0 pt-0"
                : "pb-14 pt-6 sm:pt-8"
        }
      >
        <Outlet />
      </main>

      {isAuthPage || isUserArea || isCompetitionPage ? null : <SiteFooter />}
    </div>
  );
}
