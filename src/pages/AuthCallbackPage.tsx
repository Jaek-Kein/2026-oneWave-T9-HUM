import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/**
 * OAuth 콜백: 백엔드가 FRONTEND_REDIRECT_URI로 리다이렉트할 때
 * hash에 #token=...&internal_id=...&is_new_user=... 가 붙어 옵니다.
 */
export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { setAuthFromCallback } = useAuth();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    const token = params.get("token");

    if (token) {
      setAuthFromCallback(token);
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, setAuthFromCallback]);

  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      로그인 처리 중…
    </div>
  );
}
