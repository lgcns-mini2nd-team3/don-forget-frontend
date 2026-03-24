import React from "react";
import "./Notification.css"; // 💡 CSS 임포트 잊지 마세요!

const NotificationHeader = ({ count }) => (
  <header className="noti-header">
    <h2 className="noti-title">알림 센터</h2>
    <div className="unread-badge-container">
      <span>새로운 알림:</span>
      <span className="unread-count-badge">{count}</span>
    </div>
  </header>
);

export default NotificationHeader;
