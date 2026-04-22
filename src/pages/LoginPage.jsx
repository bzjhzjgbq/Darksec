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
            <p className="eyebrow">账号登录</p>
            <h1 className="mt-3 text-[32px] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[36px]">
              登录校园社区
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              已接入真实后端接口。你可以使用学号、手机号或邮箱搭配密码登录。
            </p>

            <LoginForm />
          </Card>

          <p className="mt-4 text-center text-sm text-slate-500">
            还没有账号？
            <Link to="/register" className="ml-1 text-slate-900 underline">
              去注册
            </Link>
          </p>
        </Reveal>
      </PageContainer>
    </PageReveal>
  );
}
