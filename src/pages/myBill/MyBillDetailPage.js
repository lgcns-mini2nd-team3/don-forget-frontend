import { useEffect, useState } from 'react';
import { getMyBillDetail } from '../../api/getMyBills';
import { useNavigate, useParams } from 'react-router-dom';

const MyBillDetailPage = () => {
    const {id} = useParams();
    const[bill, setBill] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("id" , id);
        const fetchData = async() =>{
            try{
                const data = await getMyBillDetail(id);
                console.log(data);
                setBill(data);
            } catch(err){
                console.log('err', err);
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
                        <span style={styles.value}>{bill.amount}원</span>
                    </div>

                    <div style={styles.row}>
                        <span style={styles.label}>납부일</span>
                        <span style={styles.value}>매달 {bill.dueDay}일</span>
                    </div>

                    <div style={styles.row}>
                        <span style={styles.label}>발행일</span>
                        <span style={styles.value}>{bill.issueDay}일</span>
                    </div>
                </div>

                <div style={styles.section}>
                    <div style={styles.row}>
                        <span style={styles.label}>반복 여부</span>
                        <span style={styles.value}>
                        {bill.isRecurring ? "예" : "아니오"}
                        </span>
                    </div>

                    <div style={styles.row}>
                        <span style={styles.label}>반복 주기</span>
                        <span style={styles.value}>{bill.recurCycle}</span>
                    </div>

                    <div style={styles.row}>
                        <span style={styles.label}>알림</span>
                        <span style={styles.value}>D-{bill.notifyBefore}</span>
                    </div>
                </div>

                <div style={styles.buttonGroup}>
                    <button style={styles.editBtn}>수정</button>
                    <button style={styles.deleteBtn}>삭제</button>
                </div>
            </div>
        </div>
    )
}

export default MyBillDetailPage;



const styles = {
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
