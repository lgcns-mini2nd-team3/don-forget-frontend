import { useEffect, useState } from 'react';
import { getMyBills } from '../../api/getMyBills';
import { useNavigate } from 'react-router-dom';

function MyBillPage() {
  const[data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyBills();
      console.log(data);
      setData(data);
    };

    fetchData();
  }, []);

  const getStatusInfo = (status) =>{
    switch(status) {
      case 'OVERDUE':
        return { label: '연체', color: '#dc2626', bg: '#fef2f2' };
      case 'UNPAID':
        return { label: '미납', color: '#ea580c', bg: '#fff7ed' };
      case 'PAID':
        return { label: '납부완료', color: '#16a34a', bg: '#f0fdf4' };
      default:
        return { label: status || '확인필요', color: '#475569', bg: '#f8fafc' };
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <p style={styles.subTitle}>나의 공과금</p>
          <h1 style={styles.title}>청구서 관리</h1>
        </div>
        <button style={styles.addButton} onClick={() => navigate("/myBills/create")}>+ 청구서 추가</button>
      </div>

      <div style={styles.summaryRow}>
        <div style={styles.summaryCard}>
          <p style={styles.summaryLabel}>전체 청구서</p>
          <strong style={styles.summaryValue}>{data.length}건</strong>
        </div>

        {/* <div style={styles.summaryCard}>
          <p style={styles.summaryLabel}>미납</p>
          <strong style={styles.summaryValue}>
            {data.filter((item) => item.status === 'UNPAID').length}건
          </strong>
        </div>

        <div style={styles.summaryCard}>
          <p style={styles.summaryLabel}>연체</p>
          <strong style={{ ...styles.summaryValue, color: '#dc2626' }}>
            {data.filter((item) => item.status === 'OVERDUE').length}건
          </strong>
        </div> */}
      </div>

      <div style={styles.listWrap}>
        {data.length === 0 ? (
          <div style={styles.emptyBox}>
            <p style={styles.emptyText}>등록된 청구서가 없습니다.</p>
          </div>
        ) : (
          data.map((item) => {
            const statusInfo = getStatusInfo(item.status);

            return (
              <div key={item.invoiceId} style={styles.card}>
                <div style={styles.cardTop}>
                  <div>
                    <h3 style={styles.billTitle}>{item.name || '청구서명 없음'}</h3>
                    <p style={styles.billSubText}>
                      납부일 {item.dueDay || '-'}
                    </p>
                  </div>

                  {/* <span
                    style={{
                      ...styles.badge,
                      color: statusInfo.color,
                      backgroundColor: statusInfo.bg,
                    }}
                  >
                    {statusInfo.label}
                  </span> */}
                </div>

                <div style={styles.amountRow}>
                  <span style={styles.amountLabel}>청구 금액</span>
                  <strong style={styles.amountValue}>
                    {item.amount?.toLocaleString?.() || item.amount}원
                  </strong>
                </div>

                <div style={styles.bottomRow}>
                  <div style={styles.infoGroup}>
                    <span style={styles.infoLabel}>반복 여부</span>
                    <span style={styles.infoValue}>
                      {item.isRecurring ? '반복' : '1회성'}
                    </span>
                  </div>

                  {/* <div style={styles.buttonGroup}>
                    <button style={styles.detailButton} onClick={() => {navigate(`/myBills/${item.invoiceId}`)}}>상세보기</button>
                    <button style={styles.payButton}>납부처리</button>
                  </div> */}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f8fafc',
    padding: '32px 24px 60px',
    fontFamily: 'Pretendard, Arial, sans-serif',
  },
  header: {
    maxWidth: '1100px',
    margin: '0 auto 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  subTitle: {
    margin: 0,
    fontSize: '14px',
    color: '#64748b',
    fontWeight: 500,
  },
  title: {
    margin: '6px 0 0',
    fontSize: '32px',
    fontWeight: 700,
    color: '#0f172a',
  },
  addButton: {
    border: 'none',
    background: '#2563eb',
    color: '#fff',
    padding: '12px 18px',
    borderRadius: '14px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.18)',
  },
  summaryRow: {
    maxWidth: '1100px',
    margin: '0 auto 24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
  },
  summaryCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
    border: '1px solid #e2e8f0',
  },
  summaryLabel: {
    margin: 0,
    fontSize: '14px',
    color: '#64748b',
  },
  summaryValue: {
    display: 'block',
    marginTop: '10px',
    fontSize: '28px',
    fontWeight: 700,
    color: '#0f172a',
  },
  listWrap: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'grid',
    gap: '16px',
  },
  emptyBox: {
    background: '#fff',
    borderRadius: '20px',
    padding: '48px 24px',
    textAlign: 'center',
    border: '1px solid #e2e8f0',
  },
  emptyText: {
    margin: 0,
    fontSize: '15px',
    color: '#64748b',
  },
  card: {
    background: '#fff',
    borderRadius: '24px',
    padding: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '20px',
  },
  billTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 700,
    color: '#0f172a',
  },
  billSubText: {
    margin: '8px 0 0',
    fontSize: '14px',
    color: '#64748b',
  },
  badge: {
    padding: '8px 12px',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },
  amountRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '16px 18px',
    background: '#f8fafc',
    borderRadius: '16px',
  },
  amountLabel: {
    fontSize: '14px',
    color: '#64748b',
  },
  amountValue: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  infoGroup: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: '14px',
    color: '#64748b',
  },
  infoValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#0f172a',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  detailButton: {
    border: '1px solid #cbd5e1',
    background: '#fff',
    color: '#334155',
    padding: '10px 14px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  payButton: {
    border: 'none',
    background: '#0f172a',
    color: '#fff',
    padding: '10px 14px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default MyBillPage;