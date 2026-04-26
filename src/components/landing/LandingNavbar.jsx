import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import BrandLogo from "../layout/BrandLogo";
import Button from "../ui/Button";
import LandingUserMenu from "./LandingUserMenu";

export default function LandingNavbar() {
  const { isLoggedIn, currentUser } = useAuth();

  return (
    <header className="py-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-bold">
          <div className="flex h-12 items-center overflow-hidden rounded-2xl bg-white px-2.5 shadow-[0_10px_30px_rgba(96,165,250,0.25)]">
            <BrandLogo src="/darksec-logo-icon.png" className="h-8" />
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
