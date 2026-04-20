import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Button from "../ui/Button";
import UserMenu from "./UserMenu";

const navItems = [
  { to: "/home", label: "棣栭〉" },
  { to: "/articles", label: "鏂囩珷" },
  { to: "/projects", label: "椤圭洰" },
  { to: "/competitions", label: "绔炶禌" },
];

function NavigationLink({ item, mobile = false, theme = "default" }) {
  const isCompetitionTheme = theme === "competition";

  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `${mobile ? "whitespace-nowrap " : ""}relative rounded-2xl px-4 py-2.5 text-sm font-medium transition duration-300 ${
          isActive
            ? "text-white"
            : isCompetitionTheme
              ? "text-[#92a59c] hover:text-[#eef6f1]"
              : "text-slate-600 hover:text-slate-900"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <motion.span
              layoutId={mobile ? "mobile-nav-pill" : "nav-pill"}
              className={`absolute inset-0 rounded-2xl ${
                isCompetitionTheme
                  ? "bg-[#101613] shadow-none"
                  : "bg-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
              }`}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
            />
          ) : null}
          <motion.span
            className={`absolute inset-0 rounded-2xl ${
              isCompetitionTheme ? "bg-[#202925]" : "bg-slate-100"
            } opacity-0`}
            whileHover={{ opacity: isActive ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <span className="relative z-10">{item.label}</span>
        </>
      )}
    </NavLink>
  );
}

function CompetitionHeaderActions({ isLoggedIn, currentUser }) {
  return (
    <div className="flex items-center gap-2">
      {!isLoggedIn ? (
        <>
          <NavLink
            to="/login"
            className="hidden h-10 items-center border border-[#3a4742] px-4 text-sm text-[#d5e1db] transition hover:border-[#688a7a] hover:text-white sm:inline-flex"
          >
            鐧诲綍
          </NavLink>
          <NavLink
            to="/register"
            className="hidden h-10 items-center bg-[#22302a] px-4 text-sm text-[#eef5f0] transition hover:bg-[#2b3933] sm:inline-flex"
          >
            娉ㄥ唽
          </NavLink>
        </>
      ) : null}
      {isLoggedIn && currentUser ? <UserMenu user={currentUser} /> : null}
    </div>
  );
}

export default function MainNavbar({
  isLoggedIn,
  currentUser,
  hideNavigation = false,
  theme = "default",
}) {
  const isCompetitionTheme = theme === "competition";

  return (
    <>
      {!hideNavigation ? (
        <nav
          className={`hidden items-center gap-1 rounded-[20px] border p-1.5 md:flex ${
            isCompetitionTheme
              ? "border-[#33403b] bg-[#1d2522] shadow-none"
              : "border-slate-200/80 bg-white/88 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_rgba(15,23,42,0.04)]"
          }`}
        >
          {navItems.map((item) => (
            <NavigationLink key={item.to} item={item} theme={theme} />
          ))}
        </nav>
      ) : (
        <div className="hidden md:block" />
      )}

      {isCompetitionTheme ? (
        <CompetitionHeaderActions isLoggedIn={isLoggedIn} currentUser={currentUser} />
      ) : (
        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className="hidden sm:block">
                <Button variant="secondary">鐧诲綍</Button>
              </NavLink>
              <NavLink to="/register" className="hidden sm:block">
                <Button>娉ㄥ唽</Button>
              </NavLink>
            </>
          ) : null}
          {isLoggedIn && currentUser ? <UserMenu user={currentUser} /> : null}
        </div>
      )}

      {!hideNavigation ? (
        <div className="w-full pb-3 md:hidden">
          <nav
            className={`flex gap-2 overflow-x-auto rounded-[20px] border p-1.5 ${
              isCompetitionTheme
                ? "border-[#33403b] bg-[#1d2522] shadow-none"
                : "border-slate-200/80 bg-white/88 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_rgba(15,23,42,0.04)]"
            }`}
          >
            {navItems.map((item) => (
              <NavigationLink key={item.to} item={item} mobile theme={theme} />
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
