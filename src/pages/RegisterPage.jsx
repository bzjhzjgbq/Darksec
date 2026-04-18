import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function RegisterPage() {
  return (
    <PageReveal className="w-full">
      <PageContainer className="w-full">
        <Reveal className="mx-auto w-full max-w-[460px]">
          <Card strong className="px-6 py-7 sm:px-8 sm:py-8">
            <p className="eyebrow">Join DarkSec</p>
            <h1 className="mt-3 text-[32px] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[36px]">
              注册开发者账号
            </h1>

            <div className="mt-7 space-y-4">
              <input className="field" placeholder="昵称" />
              <input className="field" placeholder="邮箱地址" />
              <input className="field" type="password" placeholder="设置密码" />
              <Button className="mt-2 w-full">创建账号</Button>
            </div>
          </Card>

          <p className="mt-4 text-center text-sm text-slate-500">
            创建账号后即可发布项目、参与讨论并完善个人主页。
          </p>
        </Reveal>
      </PageContainer>
    </PageReveal>
  );
}
