import React, { useEffect, useState } from "react";
import { getMyInfo, updateMyInfo, changePassword } from "../api/User";

type MyInfo = {
  userId: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  provider?: string;
  createdAt?: string;
};

const MyInfoPage = () => {
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchMyInfo = async () => {
    try {
      setLoading(true);
      const data = await getMyInfo();
      setMyInfo(data);
      setName(data.name ?? "");
      setPhone(data.phone ?? "");
    } catch (error) {
      console.error(error);
      alert("내 정보 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  const resetProfileForm = () => {
    if (!myInfo) return;
    setName(myInfo.name ?? "");
    setPhone(myInfo.phone ?? "");
  };

  const resetPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");
  };

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      alert("이름을 입력하세요.");
      return;
    }

    try {
      setSaving(true);
      await updateMyInfo({
        name,
        phone,
      });

      alert("회원 정보가 수정되었습니다.");
      fetchMyInfo();
    } catch (error) {
      console.error(error);
      alert("회원 정보 수정에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !newPasswordConfirm) {
      alert("비밀번호 항목을 모두 입력해주세요.");
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      setSaving(true);
      await changePassword({
        currentPassword,
        newPassword,
      });

      alert("비밀번호가 변경되었습니다.");
      resetPasswordForm();
    } catch (error) {
      console.error(error);
      alert("비밀번호 변경에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f8fb",
        padding: "40px 24px",
        fontFamily:
          "'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            User Service
          </p>
          <h1
            style={{
              margin: "8px 0 0",
              fontSize: "36px",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            내 정보
          </h1>
          <p
            style={{
              marginTop: "10px",
              color: "#6b7280",
              fontSize: "15px",
            }}
          >
            회원 정보를 확인하고 수정할 수 있습니다.
          </p>
        </div>

        {loading ? (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
              border: "1px solid #e5e7eb",
              color: "#6b7280",
            }}
          >
            불러오는 중...
          </div>
        ) : !myInfo ? (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
              border: "1px solid #e5e7eb",
              color: "#ef4444",
            }}
          >
            사용자 정보를 불러오지 못했습니다.
          </div>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  padding: "24px",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 18px",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  기본 정보
                </h2>

                <div style={{ display: "grid", gap: "14px" }}>
                  <InfoRow label="회원번호" value={String(myInfo.userId)} />
                  <InfoRow label="이메일" value={myInfo.email} />
                  <InfoRow label="권한" value={myInfo.role} />
                  <InfoRow label="로그인 방식" value={myInfo.provider ?? "LOCAL"} />
                  <InfoRow
                    label="가입일"
                    value={formatDateTime(myInfo.createdAt)}
                  />
                </div>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  padding: "24px",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 18px",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  프로필 수정
                </h2>

                <div style={{ display: "grid", gap: "14px" }}>
                  <div>
                    <label style={labelStyle}>이름</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="이름을 입력하세요"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>전화번호</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="전화번호를 입력하세요"
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                    <button
                      onClick={handleUpdateProfile}
                      disabled={saving}
                      style={{
                        border: "none",
                        background: "#2563eb",
                        color: "#fff",
                        padding: "12px 18px",
                        borderRadius: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                        opacity: saving ? 0.7 : 1,
                      }}
                    >
                      저장하기
                    </button>

                    <button
                      onClick={resetProfileForm}
                      style={{
                        border: "1px solid #d1d5db",
                        background: "#fff",
                        color: "#374151",
                        padding: "12px 18px",
                        borderRadius: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      초기화
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                padding: "24px",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h2
                style={{
                  margin: "0 0 18px",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                비밀번호 변경
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "14px",
                }}
              >
                <div>
                  <label style={labelStyle}>현재 비밀번호</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="현재 비밀번호"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>새 비밀번호</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="새 비밀번호"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>새 비밀번호 확인</label>
                  <input
                    type="password"
                    value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    placeholder="새 비밀번호 확인"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
                <button
                  onClick={handleChangePassword}
                  disabled={saving}
                  style={{
                    border: "none",
                    background: "#111827",
                    color: "#fff",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    opacity: saving ? 0.7 : 1,
                  }}
                >
                  비밀번호 변경
                </button>

                <button
                  onClick={resetPasswordForm}
                  style={{
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    color: "#374151",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  초기화
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      gap: "16px",
      padding: "14px 16px",
      borderRadius: "14px",
      background: "#f9fafb",
      border: "1px solid #f1f5f9",
    }}
  >
    <span
      style={{
        color: "#6b7280",
        fontSize: "14px",
        fontWeight: 600,
      }}
    >
      {label}
    </span>
    <span
      style={{
        color: "#111827",
        fontSize: "15px",
        fontWeight: 700,
      }}
    >
      {value || "-"}
    </span>
  </div>
);

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontSize: "14px",
  fontWeight: 600,
  color: "#374151",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  boxSizing: "border-box",
  outline: "none",
  background: "#fff",
};

const formatDateTime = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("ko-KR");
};

export default MyInfoPage;