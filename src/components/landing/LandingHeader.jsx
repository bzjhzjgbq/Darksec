import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../ui/Button";

export default function LandingHeader() {
  const { isLoggedIn, currentUser } = useAuth();

  return (
    <header className="border-b border-white/20 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-950 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition duration-200 group-hover:-translate-y-0.5">
            DS
          </div>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold tracking-[-0.02em] text-slate-950">
              DarkSec
            </p>
            <p className="truncate text-[11px] uppercase tracking-[0.24em] text-slate-500">
              NUIST Campus Community
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <Button variant="secondary">登录</Button>
              </Link>
              <Link to="/register">
                <Button>注册</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-white/92 px-2.5 py-2 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_28px_rgba(15,23,42,0.05)]">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-10 w-10 rounded-2xl object-cover ring-1 ring-slate-200"
              />
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-900">{currentUser.nickname}</p>
                <p className="text-xs text-slate-500">
                  {currentUser.levelTitle} · Lv.{currentUser.level}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
