import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function LandingUserMenu({ user }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleSwitchAccount() {
    logout();
    setOpen(false);
    navigate("/login", { replace: true });
  }

  function handleLogout() {
    logout();
    setOpen(false);
    navigate("/login", { replace: true });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/5 px-2.5 py-2 shadow-[0_1px_2px_rgba(15,23,42,0.22)] transition duration-200 hover:border-white/20 hover:bg-white/10"
      >
        <img
          src={user.avatar}
          alt={user.nickname}
          className="h-10 w-10 rounded-2xl object-cover ring-1 ring-white/15"
        />
        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold text-white">{user.nickname}</p>
          <p className="text-xs text-slate-300">已登录</p>
        </div>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+12px)] z-40 w-[280px] rounded-[24px] border border-white/10 bg-slate-900 p-3 shadow-[0_24px_64px_rgba(2,6,23,0.45)]"
          >
            <div className="rounded-[20px] border border-white/8 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.nickname}
                  className="h-12 w-12 rounded-2xl object-cover ring-1 ring-white/10"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{user.nickname}</p>
                  <p className="mt-1 text-xs text-slate-400">南京信息工程大学校园社区</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSwitchAccount}
              className="mt-3 flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition duration-200 hover:bg-white/5"
            >
              <div>
                <p className="text-sm font-medium text-white">切换账号</p>
                <p className="mt-1 text-xs text-slate-400">返回登录页，切换其他账号</p>
              </div>
              <span className="text-slate-500">›</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 flex w-full items-center justify-between rounded-2xl border border-rose-500/20 bg-rose-500/10 px-3 py-3 text-left transition duration-200 hover:bg-rose-500/15"
            >
              <div>
                <p className="text-sm font-medium text-rose-300">退出登录</p>
                <p className="mt-1 text-xs text-rose-200/70">清除登录态并返回登录页</p>
              </div>
              <span className="text-rose-300">⎋</span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
