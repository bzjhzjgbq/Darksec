import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import SocialProofSection from "../components/landing/SocialProofSection";
import CampusLogosSection from "../components/landing/CampusLogosSection";
import FeatureSection from "../components/landing/FeatureSection";
import CTASection from "../components/landing/CTASection";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#020617_0%,#051127_40%,#09152b_100%)] pb-10 text-white">
      <style>
        {`
          @keyframes landing-background-breathe {
            0%, 100% {
              opacity: 0.86;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.028);
            }
          }

          .landing-title-shadow,
          .landing-title-fill,
          .landing-title-stroke,
          .landing-title-scan {
            font-family: "Segoe UI", "Microsoft YaHei", sans-serif;
            font-size: 132px;
            font-style: italic;
            font-weight: 900;
            letter-spacing: 0;
          }

          .landing-title-shadow {
            fill: rgba(15, 23, 42, 0.44);
            stroke: rgba(56, 189, 248, 0.32);
            stroke-width: 8px;
            opacity: 0.76;
            animation: landing-title-shadow-pulse 6s ease-in-out infinite;
          }

          .landing-title-fill {
            filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.34)) drop-shadow(0 0 36px rgba(37, 99, 235, 0.18));
            animation: landing-title-fill-breathe 5.8s ease-in-out infinite;
          }

          .landing-title-stroke {
            fill: none;
            stroke: rgba(125, 211, 252, 0.42);
            stroke-width: 2.6px;
            stroke-dasharray: 150 720;
            stroke-linecap: round;
            animation: landing-title-stroke-run 5.6s ease-in-out infinite;
          }

          .landing-title-scan {
            fill: none;
            stroke: rgba(224, 242, 254, 0.9);
            stroke-width: 2px;
            stroke-dasharray: 54 820;
            stroke-linecap: round;
            opacity: 0.72;
            filter: drop-shadow(0 0 10px rgba(125, 211, 252, 0.58));
            animation: landing-title-scan-run 3.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          }

          .landing-svg-ribbon {
            opacity: 0.32;
            stroke-dasharray: 130 520;
            filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.35));
            animation: landing-ribbon-flow 8.5s ease-in-out infinite;
          }

          .landing-svg-ribbon-two {
            opacity: 0.22;
            animation-duration: 10s;
            animation-delay: -2s;
          }

          .landing-energy-river {
            animation: landing-energy-river 7.2s ease-in-out infinite;
          }

          .landing-energy-pulse {
            animation: landing-energy-pulse 8.8s ease-in-out infinite;
          }

          .landing-energy-pulse-delayed {
            animation-delay: -3s;
          }

          @keyframes landing-title-shadow-pulse {
            0%, 100% {
              opacity: 0.58;
              transform: scale(1);
            }
            50% {
              opacity: 0.84;
              transform: scale(1.012);
            }
          }

          @keyframes landing-title-fill-breathe {
            0%, 100% {
              opacity: 0.9;
              transform: translateY(0);
            }
            50% {
              opacity: 1;
              transform: translateY(-1px);
            }
          }

          @keyframes landing-title-stroke-run {
            0% {
              stroke-dashoffset: 720;
              opacity: 0.18;
            }
            24% {
              opacity: 0.68;
            }
            62% {
              opacity: 0.54;
            }
            100% {
              stroke-dashoffset: -240;
              opacity: 0.16;
            }
          }

          @keyframes landing-title-scan-run {
            0% {
              stroke-dashoffset: 860;
              opacity: 0;
            }
            18% {
              opacity: 0.76;
            }
            58% {
              opacity: 0.82;
            }
            100% {
              stroke-dashoffset: -160;
              opacity: 0;
            }
          }

          @keyframes landing-ribbon-flow {
            0% {
              stroke-dashoffset: 520;
              opacity: 0.18;
            }
            45% {
              opacity: 0.45;
            }
            100% {
              stroke-dashoffset: -180;
              opacity: 0.18;
            }
          }

          @keyframes landing-energy-river {
            0%, 100% {
              opacity: 0.28;
              transform: scaleX(0.92) translateX(-12px);
            }
            50% {
              opacity: 0.68;
              transform: scaleX(1.08) translateX(12px);
            }
          }

          @keyframes landing-energy-pulse {
            0%, 100% {
              opacity: 0.36;
              transform: scale(0.92);
            }
            50% {
              opacity: 0.74;
              transform: scale(1.08);
            }
          }

          @keyframes landing-mist-drift {
            0%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
            }
            50% {
              transform: translate3d(1.8%, -1.6%, 0) scale(1.04);
            }
          }

          @keyframes landing-twinkle {
            0%, 100% {
              opacity: 0.18;
            }
            50% {
              opacity: 0.44;
            }
          }

          @keyframes landing-title-breathe {
            0%, 100% {
              opacity: 0.95;
              transform: translateY(0) scale(1);
            }
            50% {
              opacity: 1;
              transform: translateY(-1px) scale(1.01);
            }
          }

          @keyframes landing-title-ink {
            0% {
              background-position: 180% 50%;
              filter: brightness(0.88);
            }
            50% {
              background-position: 20% 50%;
              filter: brightness(0.98);
            }
            100% {
              background-position: -120% 50%;
              filter: brightness(0.9);
            }
          }

          @keyframes landing-energy-left {
            0%, 100% {
              transform: translateX(0) translateY(0) rotate(-8deg) scale(1);
              opacity: 0.54;
            }
            50% {
              transform: translateX(16px) translateY(-4px) rotate(-6deg) scale(1.06);
              opacity: 0.78;
            }
          }

          @keyframes landing-energy-right {
            0%, 100% {
              transform: translateX(0) translateY(0) rotate(8deg) scale(1);
              opacity: 0.56;
            }
            50% {
              transform: translateX(-18px) translateY(4px) rotate(6deg) scale(1.08);
              opacity: 0.8;
            }
          }

          @keyframes landing-energy-core {
            0%, 100% {
              transform: scaleX(0.94);
              opacity: 0.34;
            }
            50% {
              transform: scaleX(1.06);
              opacity: 0.56;
            }
          }

          @keyframes landing-orbit-left {
            0%, 100% {
              transform: skewX(-18deg) rotate(-8deg) translateX(0);
              opacity: 0.56;
            }
            50% {
              transform: skewX(-12deg) rotate(-6deg) translateX(16px);
              opacity: 0.86;
            }
          }

          @keyframes landing-orbit-right {
            0%, 100% {
              transform: skewX(18deg) rotate(8deg) translateX(0);
              opacity: 0.52;
            }
            50% {
              transform: skewX(12deg) rotate(6deg) translateX(-16px);
              opacity: 0.84;
            }
          }

          @keyframes landing-spark {
            0%, 100% {
              opacity: 0.36;
              transform: scale(0.86);
            }
            50% {
              opacity: 1;
              transform: scale(1.16);
            }
          }

          @keyframes landing-avatar-flow {
            0%, 10% {
              transform: translateX(0);
            }
            20%, 30% {
              transform: translateX(-42px);
            }
            40%, 50% {
              transform: translateX(-84px);
            }
            60%, 70% {
              transform: translateX(-126px);
            }
            80%, 90% {
              transform: translateX(-168px);
            }
            100% {
              transform: translateX(-210px);
            }
          }

          @keyframes landing-avatar-trail {
            0%, 100% {
              opacity: 0.3;
              transform: scaleX(0.92);
            }
            50% {
              opacity: 0.72;
              transform: scaleX(1.08);
            }
          }

          .landing-avatar-collider {
            animation: landing-avatar-collide 10s cubic-bezier(0.76, 0.02, 0.2, 1) infinite;
            will-change: transform, opacity, filter;
          }

          @keyframes landing-avatar-collide {
            0% {
              opacity: 0;
              filter: blur(2px);
              transform: translate3d(190px, -50%, 0) scale(0.76);
            }
            10% {
              opacity: 0.74;
              filter: blur(0.6px);
            }
            24% {
              opacity: 1;
              transform: translate3d(88px, -50%, 0) scale(0.88);
            }
            38% {
              transform: translate3d(44px, -50%, 0) scale(1.02);
            }
            48% {
              transform: translate3d(16px, -50%, 0) scale(1.1);
            }
            56% {
              transform: translate3d(-8px, -50%, 0) scale(1);
            }
            70% {
              opacity: 0.86;
              transform: translate3d(-70px, -50%, 0) scale(0.9);
            }
            86% {
              opacity: 0.36;
              filter: blur(0.8px);
              transform: translate3d(-144px, -50%, 0) scale(0.76);
            }
            100% {
              opacity: 0;
              filter: blur(2px);
              transform: translate3d(-204px, -50%, 0) scale(0.68);
            }
          }

          @keyframes landing-avatar-field {
            0%, 100% {
              opacity: 0.3;
              transform: translateX(-50%) translateY(-50%) scaleX(0.82);
            }
            50% {
              opacity: 0.52;
              transform: translateX(-50%) translateY(-50%) scaleX(1.12);
            }
          }

          .landing-community-button {
            position: relative;
            overflow: hidden;
          }

          .landing-community-button::before {
            content: "";
            position: absolute;
            inset: 1px;
            border-radius: 21px;
            background: linear-gradient(135deg, rgba(255,255,255,0.36), rgba(255,255,255,0.08) 46%, rgba(56,189,248,0.14));
            opacity: 0.82;
          }

          .landing-community-button::after {
            content: "";
            position: absolute;
            inset: auto 14px 0 14px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(125,211,252,0.9), transparent);
            box-shadow: 0 0 18px rgba(56,189,248,0.58);
            opacity: 0.9;
          }
        `}
      </style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(59,130,246,0.19),transparent_20%),radial-gradient(circle_at_76%_20%,rgba(34,211,238,0.1),transparent_20%),radial-gradient(circle_at_50%_56%,rgba(56,189,248,0.08),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.14),rgba(2,6,23,0.28))] [animation:landing-background-breathe_18s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(14,165,233,0.08),transparent_16%),radial-gradient(circle_at_78%_34%,rgba(96,165,250,0.12),transparent_18%),radial-gradient(circle_at_60%_76%,rgba(125,211,252,0.08),transparent_16%)] blur-2xl [animation:landing-mist-drift_24s_ease-in-out_infinite]" />
        <div className="absolute inset-x-0 top-[13%] h-[30rem] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.16),transparent_38%)] blur-3xl [animation:landing-background-breathe_16s_ease-in-out_infinite]" />
        <div className="absolute left-[12%] top-[18%] h-1.5 w-1.5 rounded-full bg-sky-100/50 [animation:landing-twinkle_7s_ease-in-out_infinite]" />
        <div className="absolute left-[28%] top-[34%] h-1 w-1 rounded-full bg-sky-200/35 [animation:landing-twinkle_9s_ease-in-out_infinite]" />
        <div className="absolute left-[64%] top-[22%] h-1.5 w-1.5 rounded-full bg-cyan-100/40 [animation:landing-twinkle_8.4s_ease-in-out_infinite]" />
        <div className="absolute right-[14%] top-[36%] h-1 w-1 rounded-full bg-sky-100/40 [animation:landing-twinkle_10s_ease-in-out_infinite]" />
        <div className="absolute right-[30%] top-[14%] h-1.5 w-1.5 rounded-full bg-white/35 [animation:landing-twinkle_8s_ease-in-out_infinite]" />
        <div className="absolute left-[18%] top-[60%] h-28 w-60 rounded-full bg-sky-500/10 blur-3xl [animation:landing-mist-drift_26s_ease-in-out_infinite]" />
        <div className="absolute right-[16%] top-[62%] h-24 w-52 rounded-full bg-indigo-500/10 blur-3xl [animation:landing-background-breathe_20s_ease-in-out_infinite]" />
      </div>

      <div className="relative">
        <LandingNavbar />
        <HeroSection />
        <SocialProofSection />
        <CampusLogosSection />
        <FeatureSection />
        <CTASection />
      </div>
    </div>
  );
}
