import React from "react";

const NotificationItem = ({ item, onRead, onDelete }) => {
  const { notificationId, type, message, read, sentAt } = item;

  // 알림 타입별 색상 지정
  const getTypeStyles = (type) => {
    switch (type) {
      case "PAYMENT_REMINDER":
        return { bg: "#FEF3C7", text: "#92400E", label: "결제 예정" };
      case "OVERDUE":
        return { bg: "#FEE2E2", text: "#991B1B", label: "미납 안내" };
      default:
        return { bg: "#DBEAFE", text: "#1E40AF", label: "일반 알림" };
    }
  };

  const style = getTypeStyles(type);

  const isReadStatus = Boolean(read) || read === 1;

  return (
    <div
      onClick={() => !isReadStatus && onRead(notificationId, isReadStatus)}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        marginBottom: "12px",
        borderRadius: "16px",
        border: "1px solid",
        borderColor: isReadStatus ? "#F3F4F6" : "#E0E7FF",
        backgroundColor: isReadStatus ? "#FFFFFF" : "#F8FAFF",
        boxShadow: isReadStatus ? "none" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        cursor: isReadStatus ? "default" : "pointer",
        transition: "all 0.2s",
        position: "relative",
        textAlign: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: "bold",
            padding: "2px 8px",
            borderRadius: "6px",
            backgroundColor: style.bg,
            color: style.text,
          }}
        >
          {style.label}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(notificationId);
          }}
          style={{
            background: "none",
            border: "none",
            color: "#9CA3AF",
            fontSize: "12px",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.target.style.color = "#EF4444")}
          onMouseOut={(e) => (e.target.style.color = "#9CA3AF")}
        >
          삭제
        </button>
      </div>

      <p
        style={{
          fontSize: "14px",
          lineHeight: "1.5",
          margin: "0",
          color: isReadStatus ? "#9CA3AF" : "#1F2937",
          fontWeight: isReadStatus ? "normal" : "600",
        }}
      >
        {message}
      </p>

      <div style={{ marginTop: "8px", fontSize: "11px", color: "#9CA3AF" }}>
        {new Date(sentAt).toLocaleString("ko-KR", {
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      {!isReadStatus && (
        <div
          style={{
            position: "absolute",
            top: "18px",
            right: "10px",
            width: "8px",
            height: "8px",
            backgroundColor: "#2563EB",
            borderRadius: "50%",
          }}
        />
      )}
    </div>
  );
};

export default NotificationItem;
