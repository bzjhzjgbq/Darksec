import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import Card from "../components/ui/Card";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <PageReveal className="w-full">
      <PageContainer className="w-full">
        <Reveal className="mx-auto w-full max-w-[460px]">
          <Card strong className="px-6 py-7 sm:px-8 sm:py-8">
            <p className="eyebrow">璐﹀彿鐧诲綍</p>
            <h1 className="mt-3 text-[32px] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[36px]">
              鐧诲綍鏍″洯绀惧尯
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              宸叉帴鍏ョ湡瀹炲悗绔帴鍙ｃ€備綘鍙互浣跨敤瀛﹀彿銆佹墜鏈哄彿鎴栭偖绠辨惌閰嶅瘑鐮佺櫥褰曘€?            </p>

            <LoginForm />
          </Card>

          <p className="mt-4 text-center text-sm text-slate-500">
            杩樻病鏈夎处鍙凤紵
            <Link to="/register" className="ml-1 text-slate-900 underline">
              鍘绘敞鍐?            </Link>
          </p>
        </Reveal>
      </PageContainer>
    </PageReveal>
  );
}
