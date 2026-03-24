import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PaymentsPage } from "../pages/PaymentsPage";
import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { Signup } from "../pages/SignUpPage";
import TemplatesPage from "../pages/TemplatesPage";
import { TopBar } from "../components/TopBar";

function AppRouter() {
  return (
    <BrowserRouter>
      <TopBar title="Don-Forget" unreadCount={3} />
      <Routes>
        {/* 결제 페이지 */}
        <Route path="/payments" element={<PaymentsPage />} />
        {/* 홈 페이지 */}
        <Route path="/" element={<HomePage />} />
        {/* 로그인 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        {/* 회원가입 페이지 */}
        <Route path="/signup" element={<Signup />} />
        {/* 템플릿 페이지 */}
        <Route path="/templates" element={<TemplatesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;