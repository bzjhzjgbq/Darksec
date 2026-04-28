import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function HeroSection() {
  const { isLoggedIn } = useAuth();

  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-4 pb-8 pt-8 text-center sm:px-6 lg:px-8 md:pt-14">
      <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-sky-200/80">
        Campus Security Community
      </p>

      <div className="relative mt-7 flex w-full max-w-6xl flex-col items-center overflow-visible">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[310px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-85">
          <div className="landing-energy-river absolute left-[8%] top-[43%] h-16 w-[84%] rounded-full bg-[linear-gradient(90deg,transparent,rgba(14,165,233,0.18),rgba(56,189,248,0.46),rgba(37,99,235,0.28),transparent)] blur-[18px]" />
          <div className="landing-energy-pulse absolute left-[17%] top-[30%] h-28 w-56 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.28),rgba(59,130,246,0.08)_54%,transparent_78%)] blur-2xl" />
          <div className="landing-energy-pulse landing-energy-pulse-delayed absolute right-[17%] top-[28%] h-28 w-56 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.26),rgba(34,211,238,0.08)_54%,transparent_78%)] blur-2xl" />
        </div>

        <span className="rounded-full border border-sky-300/20 bg-slate-950/30 px-4 py-1 text-[11px] text-sky-100/70 backdrop-blur-sm">
          暗全
        </span>

        <div className="relative mt-5 w-full max-w-[940px]">
          <svg
            className="mx-auto block h-[160px] w-full overflow-visible sm:h-[210px] lg:h-[250px]"
            viewBox="0 0 940 260"
            role="img"
            aria-label="DarkSec"
          >
            <defs>
              <linearGradient
                id="darksecInkFlow"
                x1="-300"
                y1="0"
                x2="620"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#d8f2ff" stopOpacity="0.72" />
                <stop offset="24%" stopColor="#7dd3fc" stopOpacity="0.88" />
                <stop offset="46%" stopColor="#ffffff" stopOpacity="0.94" />
                <stop offset="58%" stopColor="#22d3ee" stopOpacity="0.9" />
                <stop offset="78%" stopColor="#2563eb" stopOpacity="0.72" />
                <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.72" />
                <animate
                  attributeName="x1"
                  values="-520;340;-520"
                  dur="8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="x2"
                  values="380;1220;380"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </linearGradient>

              <filter id="darksecGlow" x="-25%" y="-50%" width="150%" height="200%">
                <feGaussianBlur stdDeviation="5" result="softGlow" />
                <feColorMatrix
                  in="softGlow"
                  type="matrix"
                  values="0 0 0 0 0.08 0 0 0 0 0.66 0 0 0 0 1 0 0 0 0.66 0"
                  result="blueGlow"
                />
                <feMerge>
                  <feMergeNode in="blueGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              className="landing-svg-ribbon"
              d="M88 142 C220 62, 330 184, 472 124 S724 64, 852 146"
              fill="none"
              stroke="#38bdf8"
              strokeLinecap="round"
              strokeWidth="5"
            />
            <path
              className="landing-svg-ribbon landing-svg-ribbon-two"
              d="M118 158 C260 212, 358 84, 506 148 S726 222, 830 120"
              fill="none"
              stroke="#2563eb"
              strokeLinecap="round"
              strokeWidth="3"
            />

            <text
              className="landing-title-shadow"
              dominantBaseline="middle"
              filter="url(#darksecGlow)"
              textAnchor="middle"
              x="470"
              y="148"
            >
              DarkSec
            </text>
            <text
              className="landing-title-stroke"
              dominantBaseline="middle"
              textAnchor="middle"
              x="470"
              y="148"
            >
              DarkSec
            </text>
            <text
              className="landing-title-fill"
              dominantBaseline="middle"
              fill="url(#darksecInkFlow)"
              textAnchor="middle"
              x="470"
              y="148"
            >
              DarkSec
            </text>
            <text
              className="landing-title-scan"
              dominantBaseline="middle"
              textAnchor="middle"
              x="470"
              y="148"
            >
              DarkSec
            </text>
          </svg>
        </div>

        <div className="mt-1 flex items-center gap-5 text-white/95">
          <span className="h-px w-16 bg-[linear-gradient(90deg,transparent,rgba(96,165,250,0.7),transparent)] shadow-[0_0_8px_rgba(56,189,248,0.32)]" />
          <span className="text-[18px] font-semibold sm:text-[20px]">
            南京信息工程大学校园社区平台
          </span>
          <span className="h-px w-16 bg-[linear-gradient(90deg,transparent,rgba(96,165,250,0.7),transparent)] shadow-[0_0_8px_rgba(56,189,248,0.32)]" />
        </div>
      </div>

      <p className="mt-7 max-w-3xl text-sm text-slate-200 sm:text-base">
        汇聚学习、项目与竞赛力量，连接更好的校园协作。
      </p>

      <div className="mt-10 flex justify-center">
        <Link
          className="landing-community-button group inline-flex h-14 items-center justify-center rounded-[22px] border border-white/35 bg-white/18 px-7 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_18px_44px_rgba(14,165,233,0.18)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/26 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.68),0_20px_52px_rgba(14,165,233,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
          to={isLoggedIn ? "/home" : "/login"}
        >
          <span className="relative z-10">进入社区</span>
        </Link>
      </div>
    </section>
  );
}
