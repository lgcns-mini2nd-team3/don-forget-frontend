import { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { PayResponseDTO, PaymentStatus } from "../features/payments/api/payments";
import { PaymentList } from "../features/payments/components/PaymentList";
import { PaymentDetailModal } from "../features/payments/components/PaymentDetailModal";
import {getPayments, markPaid, markUnpaid, deletePayment} from "../features/payments/api/payments";

type StatusFilter = "ALL" | PaymentStatus;

export function PaymentsPage() {
  const [items, setItems] = useState<PayResponseDTO[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("ALL");
  const [loading, setLoading] = useState(false);

  // 페이징 자리(주석)
  const [hasNext, setHasNext] = useState(false);
  // const [nextCursor, setNextCursor] = useState<string | null>(null);

  // 상세 모달
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [selected, setSelected] = useState<PayResponseDTO | null>(null);

  useEffect(() => {
    void fetchList(true);
  }, []);

async function fetchList(reset: boolean) {
  setLoading(true);
  try {
    // TODO: 페이징 도입 시 cursor/page params 여기서 처리
    const data = await getPayments();

    console.log("Fetched payments:", data);
    setItems((prev) => (reset ? data : [...prev, ...data]));

    // TODO: 응답에 hasNext/nextCursor가 있으면 여기서 세팅
    setHasNext(false);
  } catch (error) {
    console.error("Failed to fetch payments:", error);
  } finally {
    setLoading(false);
  }
}

  const filtered = useMemo(() => {
    if (filter === "ALL") return items;
    return items.filter((x) => x.status === filter);
  }, [items, filter]);

  function openDetail(paymentId: number) {
    setDetailOpen(true);
    setDetailLoading(true);

    // 1) 목록에서 즉시 보여주기
    const fromList = items.find((x) => x.paymentId === paymentId) ?? null;
    setSelected(fromList);

    // 2) TODO: 단건 상세 조회 API 호출 위치
    // 완료 후 setSelected(...)
    setDetailLoading(false);
  }

  function closeDetail() {
    setDetailOpen(false);
    setSelected(null);
  }

  async function onPaid(paymentId: number) {
    markPaid(paymentId)
      .then((updated) => {
        console.log("Marked as paid:", updated);
        setItems((prev) => prev.map((x) => (x.paymentId === paymentId ? updated : x))); 
        setSelected(updated);
      }).catch((error) => {
        console.error("Failed to mark as paid:", error);
      });
  }

  async function onUnpaid(paymentId: number) {
    markUnpaid(paymentId)
      .then((updated) => {
        console.log("Marked as unpaid:", updated);
        setItems((prev) => prev.map((x) => (x.paymentId === paymentId ? updated : x)));
        setSelected(updated);
      }).catch((error) => {
        console.error("Failed to mark as unpaid:", error);
      });
  }

  return (
    <Page>
      <Header>
        <Title>납부 체크리스트</Title>
        <SubTitle>마감일(due date) 기준으로 납부 상태를 관리하세요.</SubTitle>
      </Header>

      <Toolbar>
        <Filter>
          <FilterBtn data-active={filter === "ALL"} onClick={() => setFilter("ALL")}>전체</FilterBtn>
          <FilterBtn data-active={filter === "PENDING"} onClick={() => setFilter("PENDING")}>미납</FilterBtn>
          <FilterBtn data-active={filter === "OVERDUE"} onClick={() => setFilter("OVERDUE")}>연체</FilterBtn>
          <FilterBtn data-active={filter === "PAID"} onClick={() => setFilter("PAID")}>완료</FilterBtn>
        </Filter>

        <Right>
          <SmallBtn onClick={() => fetchList(true)} disabled={loading}>새로고침</SmallBtn>
        </Right>
      </Toolbar>

      <PaymentList
        items={filtered}
        loading={loading}
        onRowClick={openDetail}
        onPaid={onPaid}
        onUnpaid={onUnpaid}
        hasNext={hasNext}
        onLoadMore={hasNext ? () => fetchList(false) : undefined}
      />

      <PaymentDetailModal
        open={detailOpen}
        loading={detailLoading}
        payment={selected}
        onClose={closeDetail}
        onPaid={onPaid}
        onUnpaid={onUnpaid}
      />
    </Page>
  );
}

const Page = styled.div`
  padding: 24px;
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 16px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 900;
  color: #111827;
`;

const SubTitle = styled.p`
  margin: 8px 0 0;
  color: #4b5563;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
`;

const Filter = styled.div`
  display: inline-flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const FilterBtn = styled.button`
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #374151;
  padding: 8px 10px;
  border-radius: 999px;
  font-weight: 800;
  cursor: pointer;

  &[data-active="true"] {
    border-color: #2563eb;
    color: #2563eb;
    background: #eff6ff;
  }
`;

const Right = styled.div`
  display: inline-flex;
  gap: 8px;
`;

const SmallBtn = styled.button`
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 900;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;