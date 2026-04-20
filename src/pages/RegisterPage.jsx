import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import Card from "../components/ui/Card";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <PageReveal className="w-full">
      <PageContainer className="w-full">
        <Reveal className="mx-auto w-full max-w-[500px]">
          <Card strong className="px-6 py-7 sm:px-8 sm:py-8">
            <p className="eyebrow">娉ㄥ唽璐﹀彿</p>
            <h1 className="mt-3 text-[32px] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[36px]">
              娉ㄥ唽鏍″洯绀惧尯璐﹀彿
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              宸叉帴鍏ユ渶鏂扮湡瀹炴敞鍐屾帴鍙ｃ€傛墜鏈哄彿銆侀偖绠辨垨瀛﹀彿鑷冲皯濉啓涓€椤癸紝骞跺～鍐欓個璇风爜鍚庢彁浜ゃ€?            </p>
            <p className="mt-2 text-xs leading-6 text-slate-500">
              Swagger 褰撳墠璇存槑涓殑鍒濆閭€璇风爜涓?`LiJunzhe`銆傚悗缁櫘閫氱敤鎴风殑閭€璇风爜浼氱敱浜岀骇绠＄悊鍛樿处鍙风敓鎴愩€?            </p>

            <RegisterForm />
          </Card>

          <p className="mt-4 text-center text-sm text-slate-500">
            宸叉湁璐﹀彿锛?            <Link to="/login" className="ml-1 text-slate-900 underline">
              鍘荤櫥褰?            </Link>
          </p>
        </Reveal>
      </PageContainer>
    </PageReveal>
  );
}
