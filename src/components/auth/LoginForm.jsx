import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../ui/Button";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({
    loginId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.loginId.trim()) {
      setError("请输入学号、手机号或邮箱。");
      return;
    }

    if (form.password.trim().length < 8) {
      setError("密码至少需要 8 位。");
      return;
    }

    try {
      setLoading(true);
      await login({
        loginId: form.loginId.trim(),
        password: form.password,
      });
      navigate(location.state?.from || "/home", { replace: true });
    } catch (submitError) {
      setError(submitError.message || "登录失败，请检查账号和密码。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
      <input
        className="field"
        name="loginId"
        value={form.loginId}
        onChange={handleChange}
        placeholder="学号 / 手机号 / 邮箱"
      />
      <input
        className="field"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="密码"
      />

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <Button className="mt-2 w-full" type="submit" disabled={loading}>
        {loading ? "正在登录..." : "登录"}
      </Button>
    </form>
  );
}
