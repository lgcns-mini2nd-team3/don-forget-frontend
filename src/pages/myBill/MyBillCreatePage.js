import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMyBill } from "./../../api/getMyBills";

const MyBillCreatePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    templateId: "",
    name: "",
    amount: "",
    issueDay: "",
    dueDay: "",
    notifyBefore: "0",
    isRecurring: false,
    recurCycle: "",
    recurStart: "",
    recurEnd: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      alert("청구서명을 입력해주세요.");
      return false;
    }

    if (form.amount === "" || Number(form.amount) <= 0) {
      alert("금액은 0보다 커야 합니다.");
      return false;
    }

    if (
      form.issueDay === "" ||
      Number(form.issueDay) < 1 ||
      Number(form.issueDay) > 31
    ) {
      alert("청구일은 1~31 사이여야 합니다.");
      return false;
    }

    if (
      form.dueDay === "" ||
      Number(form.dueDay) < 1 ||
      Number(form.dueDay) > 31
    ) {
      alert("납부일은 1~31 사이여야 합니다.");
      return false;
    }

    if (form.notifyBefore === "" || Number(form.notifyBefore) < 0) {
      alert("알림 기준일은 0 이상이어야 합니다.");
      return false;
    }

    if (form.isRecurring) {
      if (!form.recurCycle) {
        alert("반복 주기를 선택해주세요.");
        return false;
      }

      if (!form.recurStart) {
        alert("반복 시작일을 입력해주세요.");
        return false;
      }

      if (form.recurEnd && form.recurStart > form.recurEnd) {
        alert("반복 종료일은 반복 시작일보다 빠를 수 없습니다.");
        return false;
      }
    }

    return true;
  };

  const createHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await createMyBill({
        templateId: 1,
        name: form.name.trim(),
        amount: Number(form.amount),
        issueDay: Number(form.issueDay),
        dueDay: Number(form.dueDay),
        notifyBefore: Number(form.notifyBefore),
        isRecurring: form.isRecurring,
        recurCycle: form.isRecurring ? form.recurCycle : null,
        recurStart: form.isRecurring ? form.recurStart : null,
        recurEnd: form.isRecurring ? form.recurEnd || null : null,
      });

      navigate("/myBills");
    } catch (err) {
      console.log("create err:", err);
      const message =
        err.response?.data?.message || "등록 중 오류가 발생했습니다.";
      alert(message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>청구서 등록</h2>
          <p style={styles.description}>
            납부 일정을 미리 등록해두고 놓치지 않게 관리해보세요.
          </p>
        </div>

        <form style={styles.form} onSubmit={createHandler}>
          <div style={styles.fieldGroup}>
            <label htmlFor="name" style={styles.label}>
              청구서명
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="예: 전기요금"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="amount" style={styles.label}>
              금액
            </label>
            <input
              id="amount"
              type="number"
              name="amount"
              placeholder="예: 35000"
              value={form.amount}
              onChange={handleChange}
              min="1"
              style={styles.input}
            />
          </div>

          <div style={styles.infoRow}>
            <div style={styles.infoColSm}>
              <label htmlFor="issueDay" style={styles.label}>
                청구일
              </label>
              <input
                id="issueDay"
                type="number"
                name="issueDay"
                placeholder="예: 10"
                value={form.issueDay}
                onChange={handleChange}
                min="1"
                max="31"
                style={styles.input}
              />
            </div>

            <div style={styles.infoColSm}>
              <label htmlFor="dueDay" style={styles.label}>
                납부일
              </label>
              <input
                id="dueDay"
                type="number"
                name="dueDay"
                placeholder="예: 25"
                value={form.dueDay}
                onChange={handleChange}
                min="1"
                max="31"
                style={styles.input}
              />
            </div>

            <div style={styles.infoColLg}>
              <label htmlFor="notifyBefore" style={styles.label}>
                알림 기준일(납부일 기준 D-n)
              </label>
              <input
                id="notifyBefore"
                type="number"
                name="notifyBefore"
                placeholder="예: 3"
                value={form.notifyBefore}
                onChange={handleChange}
                min="0"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.checkboxRow}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isRecurring"
                checked={form.isRecurring}
                onChange={handleChange}
              />
              <span>반복 청구서</span>
            </label>
          </div>

          {form.isRecurring && (
            <div style={styles.recurringBox}>
              <div style={styles.recurringRow}>
                <div style={styles.recurringCol}>
                  <label htmlFor="recurCycle" style={styles.label}>
                    반복 주기
                  </label>
                  <select
                    id="recurCycle"
                    name="recurCycle"
                    value={form.recurCycle}
                    onChange={handleChange}
                    style={styles.input}
                  >
                    <option value="">선택해주세요</option>
                    <option value="MONTHLY">매월</option>
                    <option value="BIMONTHLY">격월</option>
                    <option value="QUARTERLY">분기별</option>
                    <option value="YEARLY">매년</option>
                  </select>
                </div>

                <div style={styles.recurringCol}>
                  <label htmlFor="recurStart" style={styles.label}>
                    반복 시작일
                  </label>
                  <input
                    id="recurStart"
                    type="date"
                    name="recurStart"
                    value={form.recurStart}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.recurringCol}>
                  <label htmlFor="recurEnd" style={styles.label}>
                    반복 종료일
                  </label>
                  <input
                    id="recurEnd"
                    type="date"
                    name="recurEnd"
                    value={form.recurEnd}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
              </div>
            </div>
          )}

          <div style={styles.buttonGroup}>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={() => navigate("/myBills")}
            >
              취소
            </button>
            <button type="submit" style={styles.submitButton}>
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyBillCreatePage;

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fb",
    padding: "32px 16px 60px",
    boxSizing: "border-box",
  },
  card: {
    maxWidth: "760px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "32px 24px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.06)",
    boxSizing: "border-box",
  },
  header: {
    marginBottom: "28px",
  },
  title: {
    margin: "0 0 8px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
  },
  description: {
    margin: 0,
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: 1.5,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    lineHeight: 1.4,
  },
  input: {
    width: "100%",
    height: "52px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    padding: "0 14px",
    fontSize: "15px",
    color: "#111827",
    boxSizing: "border-box",
    outline: "none",
    backgroundColor: "#fff",
  },
  infoRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1.6fr",
    gap: "16px",
    alignItems: "end",
  },
  infoColSm: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  infoColLg: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    marginTop: "4px",
  },
  checkboxLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#374151",
    cursor: "pointer",
  },
  recurringBox: {
    padding: "18px",
    borderRadius: "16px",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
  },
  recurringRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "16px",
    alignItems: "end",
  },
  recurringCol: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "8px",
  },
  cancelButton: {
    minWidth: "110px",
    height: "46px",
    border: "none",
    borderRadius: "12px",
    padding: "0 18px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    backgroundColor: "#e5e7eb",
    color: "#374151",
  },
  submitButton: {
    minWidth: "110px",
    height: "46px",
    border: "none",
    borderRadius: "12px",
    padding: "0 18px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    backgroundColor: "#2563eb",
    color: "#ffffff",
  },
};