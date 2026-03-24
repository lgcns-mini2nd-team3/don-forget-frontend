import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PaymentsPage } from "../pages/PaymentsPage";
import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { Signup } from "../pages/SignUpPage";
import TemplatesPage from "../pages/TemplatesPage";
import { TopBar } from "../components/TopBar";
import MyBillPage from "../pages/myBill/MyBillPage";
import MyBillCreatePage from "../pages/myBill/MyBillCreatePage";
import MyBillDetailPage from "../pages/myBill/MyBillDetailPage";
import NotificationsPage from "../pages/notification/NotificationPage";

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
        {/* 내 청구서 페이지 */}
        <Route path="/myBills" element={<MyBillPage />}>
        </Route>
        <Route path="/myBills/create" element={<MyBillCreatePage />} />
        <Route path="/myBills/:id" element={<MyBillDetailPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;