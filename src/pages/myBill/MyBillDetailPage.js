import { useEffect, useState } from 'react';
import { getMyBillDetail } from '../../api/getMyBills';
import { useNavigate, useParams } from 'react-router-dom';
import { updateMyBill } from './../../api/getMyBills.js';


const MyBillDetailPage = () => {
    const {id} = useParams();
    const[bill, setBill] = useState(null);
    const[isEditing, setIsEditing] = useState(false);
    const[formData, setFormData] = useState({
        amount: "",
        dueDay: "",
        issue: "",
        isRecurring: false,
        recurCycle: "MONTHLY",
        recurStart: "",
        recurEnd: "",
        notifyBefore: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        console.log("id" , id);
        const fetchData = async() =>{
            try{
                const data = await getMyBillDetail(id);
                console.log(data);

                setBill(data);
                setFormData({
                    amount: data.amount ?? "",
                    dueDay: data.dueDay ?? "",
                    issueDay : data.issueDay ?? "",
                    isRecurring: data.isRecurring ?? false,
                    recurCycle: data.recurCycle ?? "MONTHLY",
                    recurStart: data.recurStart ?? "",
                    recurEnd: data.recurEnd ?? "",
                    notifyBefore: data.notifyBefore ?? "",
                })
            } catch(err){
                console.log('fetch data err', err);
            }
        }
        fetchData();
    },[id]);

    const getStatusInfo = (status) => {
        switch (status) {
            case "OVERDUE":
                return { label: "연체", color: "#dc2626", bg: "#fef2f2" };
            case "UNPAID":
                return { label: "미납", color: "#ea580c", bg: "#fff7ed" };
            case "PAID":
                return { label: "납부완료", color: "#16a34a", bg: "#f0fdf4" };
            default:
                return { label: "확인필요", color: "#475569", bg: "#f8fafc" };
        }
    };

    const changeHandler = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev, 
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    const editModeHandler = () => {
        setIsEditing(true);
    }

    const cancleModeHandler = () => {
        if(!bill) return;
        
        setFormData({
            amount: bill.amount ?? "",
            dueDay: bill.dueDay ?? "",
            issueDay : bill.issueDay ?? "",
            isRecurring: bill.isRecurring ?? false,
            recurCycle: bill.recurCycle ?? "MONTHLY",
            recurStart: bill.recurStart ?? "",
            recurEnd: bill.recurEnd ?? "",
            notifyBefore: bill.notifyBefore ?? "",
        })

        setIsEditing(false);
    }

    const updateHandler = async() => {
        try {
            await updateMyBill(id, {
                amount: Number(formData.amount),
                dueDay: Number(formData.dueDay),
                issueDay: Number(formData.issueDay),
                isRecurring: formData.isRecurring,
                recurCycle: formData.recurCycle,
                recurStart: formData.recurStart || null,
                recurEnd: formData.recurEnd || null,
                notifyBefore: Number(formData.notifyBefore),
            });

            const updated = await getMyBillDetail(id);
                setBill(updated);
                setFormData({
                amount: updated.amount ?? "",
                dueDay: updated.dueDay ?? "",
                issueDay: updated.issueDay ?? "",
                isRecurring: updated.isRecurring ?? false,
                recurCycle: updated.recurCycle ?? "MONTHLY",
                recurStart: updated.recurStart ?? "",
                recurEnd: updated.recurEnd ?? "",
                notifyBefore: updated.notifyBefore ?? "",
            });

            setIsEditing(false);
            alert("수정 완료");
        } catch (err) {
            console.error("update err:", err);
            const message =
            err.response?.data?.message || "수정 중 오류가 발생했습니다.";
            alert(message);
        }

        
console.log("formData:", formData);
console.log("payload:", {
  amount: Number(formData.amount),
  dueDay: Number(formData.dueDay),
  isRecurring: formData.isRecurring,
  recurCycle: formData.recurCycle,
  recurStart: formData.recurStart || null,
  recurEnd: formData.recurEnd || null,
  notifyBefore: Number(formData.notifyBefore),
});





    }


    if(!bill) return <div style={styles.loading}>로딩중...</div>

    const statusInfo = getStatusInfo(bill.status);

    return (
        <div style={styles.container}> 
            <div style={styles.card}>
                <button onClick={()=> navigate("/myBills")}
                    style={styles.backBtn}>←  목록으로</button>

                <div style={styles.header}>
                    <h2 style={styles.title}>{bill.name}</h2>
                    <span
                        style={{
                        ...styles.badge,
                        color: statusInfo.color,
                        backgroundColor: statusInfo.bg,
                        }}
                    >
                        {statusInfo.label}
                    </span>
                </div>

                <div style={styles.section}>
                    <div style={styles.row}>
                        <span style={styles.label}>금액</span>
                        {isEditing ? (
                            <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={changeHandler}
                            style={styles.input}
                            />
                        ) : (
                            <span style={styles.value}>{bill.amount}원</span>
                        )}
                    </div>

                    <div style={styles.row}>
                        <span style={styles.label}>납부일</span>
                        {isEditing ? (
                            <input
                            type="number"
                            name="dueDay"
                            value={formData.dueDay}
                            onChange={changeHandler}
                            style={styles.input}
                            />
                        ) : (
                            <span style={styles.value}>매달 {bill.dueDay}일</span>
                        )}
                    </div>

                    <div style={styles.row}>
                        <span style={styles.label}>발행일</span>
                        <span style={styles.value}>{bill.issueDay}일</span>
                    </div>
                </div>

                <div style={styles.section}>
                    <div style={styles.row}>
                        <span style={styles.label}>반복 여부</span>
                        {isEditing ? (
                            <input
                            type="checkbox"
                            name="isRecurring"
                            checked={formData.isRecurring}
                            onChange={changeHandler}
                            />
                        ) : (
                            <span style={styles.value}>{bill.isRecurring ? "예" : "아니오"}</span>
                        )}
                    </div>

                    <div style={styles.row}>
                        <span style={styles.label}>반복 주기</span>
                        {isEditing ? (
                            <select
                            name="recurCycle"
                            value={formData.recurCycle}
                            onChange={changeHandler}
                            style={styles.input}
                            >
                            <option value="MONTHLY">MONTHLY</option>
                            <option value="BIMONTHLY">BIMONTHLY</option>
                            <option value="QUARTERLY">QUARTERLY</option>
                            <option value="YEARLY">YEARLY</option>
                            </select>
                        ) : (
                            <span style={styles.value}>{bill.recurCycle}</span>
                        )}
                    </div>

                    <div style={styles.row}>
                        <span style={styles.label}>알림</span>
                        {isEditing ? (
                            <input
                            type="number"
                            name="notifyBefore"
                            value={formData.notifyBefore}
                            onChange={changeHandler}
                            style={styles.input}
                            />
                        ) : (
                            <span style={styles.value}>D-{bill.notifyBefore}</span>
                        )}
                    </div>
                </div>

                <div style={styles.buttonGroup}>
                {isEditing ? (
                    <>
                    <button style={styles.editBtn} onClick={updateHandler}>저장</button>
                    <button style={styles.cancelBtn} onClick={cancleModeHandler}>취소</button>
                    </>
                ) : (
                    <>
                    <button style={styles.editBtn} onClick={editModeHandler}>수정</button>
                    <button style={styles.deleteBtn}>삭제</button>
                    </>
                )}
                </div>
            </div>
        </div>
    )
}

export default MyBillDetailPage;



const styles = {
  input: {
    width: "160px",
    padding: "8px 10px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "14px",
  },

  container: {
    padding: "24px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
  },
  badge: {
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
  },
  section: {
    marginBottom: "20px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  label: {
    color: "#64748b",
    fontSize: "14px",
  },
  value: {
    fontWeight: "500",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  cancelBtn: {
    flex: 1,
    padding: "10px",
    background: "#64748b",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  editBtn: {
    flex: 1,
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  deleteBtn: {
    flex: 1,
    padding: "10px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  backBtn: {
    marginBottom: "16px",
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "14px",
  },
  loading: {
    padding: "40px",
    textAlign: "center",
  },
};
