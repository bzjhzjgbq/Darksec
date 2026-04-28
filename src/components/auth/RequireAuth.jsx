import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const { authReady, isLoggedIn } = useAuth();

  if (!authReady) {
    return (
      <div className="mx-auto flex min-h-[40vh] w-full max-w-[1240px] items-center justify-center px-4 text-sm text-slate-500">
        正在加载账号信息...
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
