import React, { useEffect, useState } from 'react';
import { getExternalBillingHistory, ExternalBill } from '../../api/externalBilling';

const ExternalHistoryPage = () => {
  const [history, setHistory] = useState<ExternalBill[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  useEffect(() => {
    setLoading(true);
    getExternalBillingHistory()
      .then((data: ExternalBill[]) => {
        setHistory(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error("데이터를 못 가져왔어요!", err);
        setError("데이터를 불러오는 데 실패했습니다.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>데이터를 불러오는 중입니다...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>🧾 외부 고지서 수집 내역</h2>
      {/* */}
      <table border={1} style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>고지서 번호</th>
            <th>금액</th>
            <th>수집 상태</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? history.map((item: ExternalBill) => (
            <tr key={item.id}>
              <td>{item.billId}</td>
              <td>{item.amount.toLocaleString()}원</td>
              <td>✅ 성공</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            </tr>
          )) : (
            <tr><td colSpan={4} style={{ padding: '20px' }}>수집된 데이터가 없습니다.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExternalHistoryPage;