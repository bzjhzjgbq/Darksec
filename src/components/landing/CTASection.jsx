import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../ui/Button";

export default function CTASection() {
  const { isLoggedIn } = useAuth();

  return (
    <section className="flex flex-col items-center justify-center gap-10 py-16">
      <div className="flex max-w-4xl flex-col gap-4 text-center">
        <h2 className="text-[34px] font-semibold tracking-[-0.05em] text-white sm:text-[42px]">
          从宣传入口进入真正的校园主站
        </h2>
        <p className="text-lg text-slate-300">
          继续浏览文章、项目、竞赛和用户中心内容，把课程成果、竞赛经历和校园协作都连接起来。
        </p>
      </div>
      <Link to={isLoggedIn ? "/home" : "/login"}>
        <Button size="lg">进入社区</Button>
      </Link>
    </section>
  );
}
