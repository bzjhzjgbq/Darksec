import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import BrandLogo from "./BrandLogo";
import MainNavbar from "./MainNavbar";
import PageContainer from "./PageContainer";
import SiteFooter from "./SiteFooter";

export default function MainLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isUserArea = location.pathname.startsWith("/user");
  const isCompetitionPage = location.pathname.startsWith("/competitions");
  const { isLoggedIn, currentUser } = useAuth();
  const brandLink = isAuthPage ? "/" : "/home";

  return (
    <div className={isCompetitionPage ? "min-h-screen bg-[#161d1a]" : "min-h-screen"}>
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-xl ${
          isCompetitionPage
            ? "border-[#2b3531] bg-[#1a211f]/92 shadow-none"
            : "border-slate-200/80 bg-white/90 shadow-[0_1px_0_rgba(255,255,255,0.9)]"
        }`}
      >
        <PageContainer className="flex flex-wrap items-center justify-between gap-6">
          <NavLink to={brandLink} className="group py-3">
            <div
              className={`flex h-12 items-center overflow-hidden rounded-2xl border px-2.5 transition duration-200 group-hover:-translate-y-0.5 ${
                isCompetitionPage
                  ? "border-[#34423d] bg-[#101613]"
                  : "border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
              }`}
            >
              <BrandLogo src="/darksec-logo-icon.png" className="h-8" />
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
              : "pb-14 pt-6 sm:pt-8"
        }
      >
        <Outlet />
      </main>

      {isAuthPage || isUserArea || isCompetitionPage ? null : <SiteFooter />}
    </div>
  );
}
