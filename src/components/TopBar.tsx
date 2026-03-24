import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/TopBar.css";

type TopBarProps = {
  title?: string;
  unreadCount?: number;
  userName?: string;
  onLogout?: () => void;
};

export function TopBar({
  title = "Don-Forget",
  unreadCount = 0,
  userName,
  onLogout,
}: TopBarProps) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    // 홈으로 이동
    navigate("/");
  };

  return (
    <header className="topBar" role="banner">
      <div className="left">
        <button className="logoButton" onClick={handleGoHome} aria-label="홈으로 이동">
          <span className="logoDot" aria-hidden />
          <span className="title">{title}</span>
        </button>

        <nav className="nav" aria-label="주요 메뉴">
          <NavLink
            to="/payments"
            className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}
          >
            납부 체크리스트
          </NavLink>

          <NavLink
            to="/my-bills"
            className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}
          >
            내 청구서
          </NavLink>

          <NavLink
            to="/notifications"
            className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}
          >
            알림
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </NavLink>
          
          <NavLink
            to="/templates"
            className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}
          >
            템플릿
          </NavLink>
        </nav>
      </div>

      <div className="right">
        {/* 필요하면 검색 input, 필터 버튼 등 추가 가능 */}
        <Link className="ghostButton" to="/my-page">
          {userName ? `${userName} 님` : "내 정보"}
        </Link>

        <button
          className="primaryButton"
          onClick={onLogout}
          type="button"
          disabled={!onLogout}
          title={!onLogout ? "onLogout 핸들러를 연결해 주세요." : undefined}
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}