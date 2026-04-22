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
            <p className="eyebrow">注册账号</p>
            <h1 className="mt-3 text-[32px] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[36px]">
              注册校园社区账号
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              已接入最新真实注册接口。手机号、邮箱或学号至少填写一项，并填写邀请码后提交。
            </p>
            <p className="mt-2 text-xs leading-6 text-slate-500">
              Swagger 当前说明中的初始邀请码为 `LiJunzhe`。后续普通用户的邀请码会由二级管理员账号生成。
            </p>

            <RegisterForm />
          </Card>

          <p className="mt-4 text-center text-sm text-slate-500">
            已有账号？
            <Link to="/login" className="ml-1 text-slate-900 underline">
              去登录
            </Link>
          </p>
        </Reveal>
      </PageContainer>
    </PageReveal>
  );
}
