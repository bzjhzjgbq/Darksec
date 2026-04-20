import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import UserPageLayout from "../components/user/UserPageLayout";
import { useAuth } from "../contexts/AuthContext";

export default function AuthPage() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  function handleSwitchAccount() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <UserPageLayout
      title="璐﹀彿鎿嶄綔"
      description="浣犲彲浠ュ湪杩欓噷閫€鍑哄綋鍓嶈处鍙凤紝鎴栬€呭垏鎹㈠埌鏂扮殑鏍″洯绀惧尯璐﹀彿銆?
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="p-6">
          <p className="eyebrow">褰撳墠璐﹀彿</p>
          <div className="mt-4 flex items-center gap-4 rounded-[28px] border border-slate-200 bg-slate-50/80 p-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.nickname}
              className="h-20 w-20 rounded-[26px] object-cover ring-1 ring-slate-200"
            />
            <div>
              <h2 className="text-[28px] font-semibold tracking-[-0.04em] text-slate-950">
                {currentUser.nickname}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {currentUser.email || currentUser.phone || currentUser.studentId}
              </p>
              <p className="mt-2 text-sm text-slate-500">{currentUser.role}</p>
              {currentUser.inviteCode ? (
                <p className="mt-2 text-sm text-slate-500">鎴戠殑閭€璇风爜锛歿currentUser.inviteCode}</p>
              ) : null}
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-slate-950">鍒囨崲璐﹀彿</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              杩斿洖鐧诲綍椤碉紝浣跨敤鍙﹀涓€涓鍙枫€佹墜鏈哄彿鎴栭偖绠遍噸鏂扮櫥褰曘€?            </p>
            <Button className="mt-4 w-full" onClick={handleSwitchAccount}>
              鍒囨崲璐﹀彿
            </Button>
          </Card>

          <Card className="p-5">
            <h3 className="text-lg font-semibold text-slate-950">閫€鍑虹櫥褰?/h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              娓呴櫎鏈湴 token 骞堕€€鍑哄綋鍓嶄細璇濓紝閫傚悎婕旂ず涓嶅悓璐﹀彿鐧诲綍娴佺▼銆?            </p>
            <Button className="mt-4 w-full" variant="secondary" onClick={handleLogout}>
              閫€鍑虹櫥褰?            </Button>
          </Card>
        </div>
      </div>
    </UserPageLayout>
  );
}
