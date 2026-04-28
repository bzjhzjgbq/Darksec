import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../ui/Button";

const initialState = {
  nickname: "",
  phone: "",
  email: "",
  studentNo: "",
  inviteCode: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const { registerAccount } = useAuth();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  function validate() {
    if (form.nickname.trim().length < 2) {
      return "昵称至少需要 2 个字符。";
    }

    if (!form.phone.trim() && !form.email.trim() && !form.studentNo.trim()) {
      return "手机号、邮箱或学号至少填写一项。";
    }

    if (!form.inviteCode.trim()) {
      return "请输入邀请码。";
    }

    if (form.password.length < 8) {
      return "密码至少需要 8 位。";
    }

    if (form.password !== form.confirmPassword) {
      return "两次输入的密码不一致。";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await registerAccount({
        nickname: form.nickname.trim(),
        phone: form.phone.trim() || undefined,
        email: form.email.trim() || undefined,
        studentNo: form.studentNo.trim() || undefined,
        inviteCode: form.inviteCode.trim(),
        password: form.password,
      });
      navigate("/home", { replace: true });
    } catch (submitError) {
      setError(submitError.message || "注册失败，请稍后再试。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
      <input
        className="field"
        name="nickname"
        value={form.nickname}
        onChange={handleChange}
        placeholder="昵称"
      />
      <input
        className="field"
        name="studentNo"
        value={form.studentNo}
        onChange={handleChange}
        placeholder="学号（可选）"
      />
      <input
        className="field"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="手机号（可选）"
      />
      <input
        className="field"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="邮箱（可选）"
      />
      <input
        className="field"
        name="inviteCode"
        value={form.inviteCode}
        onChange={handleChange}
        placeholder="邀请码（必填）"
      />
      <input
        className="field"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="设置密码"
      />
      <input
        className="field"
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="确认密码"
      />

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <Button className="mt-2 w-full" type="submit" disabled={loading}>
        {loading ? "正在注册..." : "创建账号"}
      </Button>
    </form>
  );
}
