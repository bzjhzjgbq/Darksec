import { Link } from "react-router-dom";
import PageContainer from "./PageContainer";

const footerLinks = [
  { label: "首页", to: "/home" },
  { label: "文章", to: "/articles" },
  { label: "项目", to: "/projects" },
  { label: "竞赛", to: "/competitions" },
];

export default function SiteFooter() {
  return (
    <footer className="pb-6 pt-1">
      <PageContainer>
        <div className="border-t border-slate-200/80 pt-5 sm:pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-slate-950 text-xs font-semibold text-white shadow-sm">
                DS
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-[-0.02em] text-slate-950">DarkSec</p>
                <p className="text-xs text-slate-500">南京信息工程大学校园技术社区</p>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="transition duration-200 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 DarkSec · 南京信息工程大学校园社区原型</p>
            <p>校园技术交流 / 项目合作 / 竞赛实践 / 文章沉淀</p>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
