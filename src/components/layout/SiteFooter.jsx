import { Link, useLocation } from "react-router-dom";
import PageContainer from "./PageContainer";

const footerColumns = [
  {
    title: "平台",
    links: [
      { label: "首页", to: "/" },
      { label: "项目社区", to: "/projects" },
      { label: "文章模块", to: "/articles" },
      { label: "用户中心", to: "/user" },
    ],
  },
  {
    title: "内容",
    links: [
      { label: "精选项目", to: "/projects" },
      { label: "热门文章", to: "/articles" },
      { label: "活跃开发者", to: "/user" },
      { label: "发布项目", to: "/projects/new" },
    ],
  },
  {
    title: "关于",
    links: [
      { label: "设计原则", to: "/" },
      { label: "路线规划", to: "/" },
      { label: "社区规范", to: "/" },
      { label: "联系团队", to: "/" },
    ],
  },
];

export default function SiteFooter() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <footer className={isHome ? "pb-10 pt-4" : "pb-8 pt-2"}>
      <PageContainer>
        <div
          className={`surface-strong overflow-hidden ${
            isHome ? "px-6 py-10 sm:px-8 lg:px-10" : "px-6 py-8 sm:px-8"
          }`}
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-950 text-sm font-semibold text-white shadow-sm">
                  DS
                </div>
                <div>
                  <p className="text-base font-semibold tracking-[-0.02em] text-slate-950">
                    DarkSec
                  </p>
                  <p className="text-sm text-slate-500">Thoughtful developer community platform</p>
                </div>
              </div>

              <h3 className="mt-6 text-[26px] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[30px]">
                为项目、文章与开发者关系而设计的社区首页。
              </h3>

              <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-600">
                DarkSec 关注的不只是内容展示，更是开发者如何通过项目、文章与社区互动持续建立长期价值。
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-500">
                <span className="tag-chip">Projects</span>
                <span className="tag-chip">Articles</span>
                <span className="tag-chip">People</span>
                <span className="tag-chip">Community</span>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-semibold text-slate-950">{column.title}</h3>
                  <div className="mt-4 space-y-3 text-sm text-slate-500">
                    {column.links.map((link) => (
                      <Link
                        key={link.label}
                        to={link.to}
                        className="block transition duration-200 hover:translate-x-0.5 hover:text-slate-900"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 DarkSec. Built for thoughtful developer communities.</p>
            <div className="flex items-center gap-4">
              <span>Made with React</span>
              <span>Vite</span>
              <span>Tailwind CSS</span>
            </div>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
