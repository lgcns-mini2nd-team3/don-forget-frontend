import api from "./axios";

const API_BASE_URL = "notification-service/api/v1/notifications";

export const notificationApi = {
  // 알림 목록 조회
  getNotifications: (userId) => api.get(`${API_BASE_URL}?userId=${userId}`),

  // 안 읽은 알림 개수 조회
  getUnreadCount: (userId) =>
    api.get(`${API_BASE_URL}/unread-count?userId=${userId}`),

  // 알림 읽음 처리
  markAsRead: (id) => api.patch(`${API_BASE_URL}/${id}/read`),

  // 알림 삭제
  deleteNotification: (id) => api.delete(`${API_BASE_URL}/${id}`),
};
