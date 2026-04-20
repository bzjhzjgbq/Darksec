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
      return "鏄电О鑷冲皯闇€瑕?2 涓瓧绗︺€?;
    }

    if (!form.phone.trim() && !form.email.trim() && !form.studentNo.trim()) {
      return "鎵嬫満鍙枫€侀偖绠辨垨瀛﹀彿鑷冲皯濉啓涓€椤广€?;
    }

    if (!form.inviteCode.trim()) {
      return "璇疯緭鍏ラ個璇风爜銆?;
    }

    if (form.password.length < 8) {
      return "瀵嗙爜鑷冲皯闇€瑕?8 浣嶃€?;
    }

    if (form.password !== form.confirmPassword) {
      return "涓ゆ杈撳叆鐨勫瘑鐮佷笉涓€鑷淬€?;
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
      setError(submitError.message || "娉ㄥ唽澶辫触锛岃绋嶅悗鍐嶈瘯銆?);
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
        placeholder="鏄电О"
      />
      <input
        className="field"
        name="studentNo"
        value={form.studentNo}
        onChange={handleChange}
        placeholder="瀛﹀彿锛堝彲閫夛級"
      />
      <input
        className="field"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="鎵嬫満鍙凤紙鍙€夛級"
      />
      <input
        className="field"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="閭锛堝彲閫夛級"
      />
      <input
        className="field"
        name="inviteCode"
        value={form.inviteCode}
        onChange={handleChange}
        placeholder="閭€璇风爜锛堝繀濉級"
      />
      <input
        className="field"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="璁剧疆瀵嗙爜"
      />
      <input
        className="field"
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="纭瀵嗙爜"
      />

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <Button className="mt-2 w-full" type="submit" disabled={loading}>
        {loading ? "姝ｅ湪娉ㄥ唽..." : "鍒涘缓璐﹀彿"}
      </Button>
    </form>
  );
}
