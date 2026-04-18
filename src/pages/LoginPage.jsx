import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function LoginPage() {
  return (
    <PageReveal className="w-full">
      <PageContainer className="w-full">
        <Reveal className="mx-auto w-full max-w-[460px]">
          <Card strong className="px-6 py-7 sm:px-8 sm:py-8">
            <p className="eyebrow">Account</p>
            <h1 className="mt-3 text-[32px] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[36px]">
              登录 DarkSec
            </h1>

            <div className="mt-7 space-y-4">
              <input className="field" placeholder="邮箱地址" />
              <input className="field" type="password" placeholder="密码" />
              <Button className="mt-2 w-full">登录</Button>
            </div>
          </Card>

          <p className="mt-4 text-center text-sm text-slate-500">
            登录后即可继续访问项目、文章与社区内容。
          </p>
        </Reveal>
      </PageContainer>
    </PageReveal>
  );
}
