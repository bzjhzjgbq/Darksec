import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../ui/Button";
import LandingUserMenu from "./LandingUserMenu";

export default function LandingNavbar() {
  const { isLoggedIn, currentUser } = useAuth();

  return (
    <header className="py-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 font-bold">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(96,165,250,0.25)]">
            DS
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">DarkSec</p>
            <p className="text-xs tracking-[0.16em] text-slate-300">南京信息工程大学校园社区</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {isLoggedIn && currentUser ? (
            <LandingUserMenu user={currentUser} />
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary">登录</Button>
              </Link>
              <Link to="/register">
                <Button>注册</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
