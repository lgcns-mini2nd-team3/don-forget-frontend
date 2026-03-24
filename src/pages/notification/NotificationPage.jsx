import React, { useState, useEffect } from "react";
import { notificationApi } from "../../api/notificationApi";
import NotificationHeader from "../../components/notification/NotificationHeader";
import NotificationItem from "../../components/notification/NotificationItem";
import "./Notification.css";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const userId = localStorage.getItem("userId") || 1;

  const loadData = async () => {
    if (!userId) {
      console.error("로그인이 필요합니다.");
      return;
    }
    try {
      const [listRes, countRes] = await Promise.all([
        notificationApi.getNotifications(userId),
        notificationApi.getUnreadCount(userId),
      ]);
      setNotifications(listRes.data);
      setUnreadCount(countRes.data);
    } catch (err) {
      console.error("데이터 로딩 실패", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRead = async (id, currentIsRead) => {
    if (currentIsRead) return;

    try {
      await notificationApi.markAsRead(id);

      setNotifications((prev) =>
        prev.map((n) => (n.notificationId === id ? { ...n, read: true } : n)),
      );

      setUnreadCount((prev) => Math.max(0, prev - 1));

      console.log(`${id}번 알림 읽음 처리 성공!`);
    } catch (err) {
      console.error("읽음 처리 중 네트워크 에러:", err);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("알림을 삭제하시겠습니까?")) return;
    await notificationApi.deleteNotification(id);
    setNotifications((prev) => prev.filter((n) => n.notificationId !== id));
    loadData();
  };

  return (
    <div className="noti-page-wrapper">
      <div className="noti-container">
        <NotificationHeader count={unreadCount} />

        <main className="noti-list-content">
          {notifications.length > 0 ? (
            <div className="noti-list-scroll">
              {notifications.map((item) => (
                <NotificationItem
                  key={item.notificationId}
                  item={item}
                  onRead={handleRead}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="noti-empty-state">
              <p className="empty-text">알림 내역이 없습니다. 🌱</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NotificationPage;
