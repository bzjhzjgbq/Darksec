import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const menuItems = [
  { label: "个人主页", meta: "查看独立个人主页展示", to: "/user/profile" },
  { label: "我的收藏", meta: "按类别浏览文章、项目和竞赛", to: "/user/favorites" },
  { label: "好友", meta: "查看在线、离线与分组好友", to: "/user/friends" },
  { label: "设置", meta: "账号、安全、通知与退出操作", to: "/user/settings" },
];

export default function UserMenu({ user }) {
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
        className="group flex items-center gap-3 rounded-[22px] border border-white bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(15,23,42,0.08),0_12px_30px_rgba(15,23,42,0.12)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-100"
      >
        <img
          src={user.avatar}
          alt={user.nickname}
          className="h-10 w-10 rounded-2xl object-cover ring-1 ring-slate-200"
        />
        <div className="hidden min-w-0 text-left sm:block">
          <p className="truncate text-sm font-semibold text-slate-900">{user.nickname}</p>
          <p className="text-xs text-slate-500">
            {user.levelTitle} · Lv.{user.level}
          </p>
        </div>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+12px)] z-40 w-[360px] rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_24px_64px_rgba(15,23,42,0.16)]"
          >
            <div className="rounded-[24px] bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_45%,#0f766e_140%)] p-4 text-white">
              <div className="flex items-start gap-3">
                <img
                  src={user.avatar}
                  alt={user.nickname}
                  className="h-14 w-14 rounded-[20px] object-cover ring-1 ring-white/20"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-slate-100">
                      LV.{user.level}
                    </span>
                    <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-[11px] font-medium text-emerald-100">
                      {user.levelTitle}
                    </span>
                  </div>
                  <p className="mt-3 truncate text-lg font-semibold tracking-[-0.03em]">{user.nickname}</p>
                  <p className="mt-1 text-sm text-slate-300">{user.bio}</p>
                  <p className="mt-2 text-xs text-slate-300">
                    {user.college} · {user.major} · {user.grade}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-2xl px-3 py-3 transition duration-200 ${
                      isActive ? "bg-slate-100" : "hover:bg-slate-50"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div>
                        <p className={`text-sm font-medium ${isActive ? "text-slate-950" : "text-slate-900"}`}>
                          {item.label}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
                      </div>
                      <span className="text-slate-400">→</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center justify-between rounded-2xl border border-rose-200 bg-rose-50 px-3 py-3 text-left transition duration-200 hover:bg-rose-100"
            >
              <div>
                <p className="text-sm font-medium text-rose-700">退出登录</p>
                <p className="mt-1 text-xs text-rose-500">清除本地 token 并返回登录页</p>
              </div>
              <span className="text-rose-400">↗</span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
