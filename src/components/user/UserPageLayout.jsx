import { NavLink, useLocation } from "react-router-dom";
import PageReveal from "../motion/PageReveal";
import { useAuth } from "../../contexts/AuthContext";
import { DEFAULT_PROFILE_BACKGROUND } from "../../data/defaultProfileBackground";
import { currentUserProfile } from "../../data/mockUsers";
import { userNavigationItems } from "./userNavigation";

const DEFAULT_BACKGROUND = DEFAULT_PROFILE_BACKGROUND;

export default function UserPageLayout({ title, description, children, contentClassName = "" }) {
  const location = useLocation();
  const { currentUser } = useAuth();
  const profileId = currentUser?.id || currentUserProfile.id;
  const background =
    typeof window !== "undefined"
      ? window.localStorage.getItem(`profile-background-v2:${profileId}`) ||
        window.localStorage.getItem("profile-background-v2:default") ||
        DEFAULT_BACKGROUND
      : DEFAULT_BACKGROUND;

  return (
    <PageReveal className="h-full">
      <section className="relative min-h-[calc(100dvh-76px)] overflow-hidden text-white">
        <img src={background} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(16,24,40,0.10)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_38%)]" />

        <div className="relative grid min-h-[calc(100dvh-76px)] gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[190px_minmax(0,1fr)] lg:px-10">
          <nav className="self-start lg:sticky lg:top-8">
            <ul className="space-y-3">
              {userNavigationItems.map((item) => {
                const isActive =
                  item.match === "/user/profile"
                    ? location.pathname === "/user/profile"
                    : location.pathname.startsWith(item.match);

                return (
                  <li key={item.to} className="relative">
                    {isActive ? (
                      <div className="absolute inset-0 rounded-full bg-white/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-xl" />
                    ) : null}
                    <NavLink
                      to={item.to}
                      className={`relative flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition ${
                        isActive ? "text-white" : "text-white/76 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            className={`self-start rounded-[34px] border border-white/18 bg-white/14 px-6 py-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_24px_60px_rgba(15,23,42,0.14)] backdrop-blur-[22px] sm:px-8 sm:py-8 ${contentClassName}`}
          >
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/54">User Space</p>
              <h1 className="mt-3 text-[30px] font-semibold tracking-[-0.05em] text-white">{title}</h1>
              {description ? <p className="mt-3 text-sm leading-7 text-white/72">{description}</p> : null}
            </div>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </section>
    </PageReveal>
  );
}
