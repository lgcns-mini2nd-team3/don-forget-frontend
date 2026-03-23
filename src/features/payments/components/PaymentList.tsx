import styled from "@emotion/styled";
import { PayResponseDTO } from "../api/payments";
import { formatMoney } from "../utils/paymentUtils";
import { DdayBadge, StatusBadge } from "./Badges";

type Props = {
  items: PayResponseDTO[];
  loading?: boolean;
  onRowClick: (paymentId: number) => void;

  // TODO: 통신 연결 지점
  onPaid: (paymentId: number) => void;
  onUnpaid: (paymentId: number) => void;

  // 페이징 자리
  hasNext?: boolean;
  onLoadMore?: () => void;
};

export function PaymentList({
  items,
  loading = false,
  onRowClick,
  onPaid,
  onUnpaid,
  hasNext = false,
  onLoadMore,
}: Props) {
  return (
    <Card>
      <HeaderRow>
        <div>청구서</div>
        <div>납부 기간</div>
        <div>금액</div>
        <div>상태</div>
        <div />
      </HeaderRow>

      {loading ? (
        <Empty>불러오는 중...</Empty>
      ) : items.length === 0 ? (
        <Empty>납부할 항목이 없습니다.</Empty>
      ) : (
        items.map((p) => (
          <Row key={p.paymentId} onClick={() => onRowClick(p.paymentId)}>
            <div>
              <InvoiceName>{p.invoiceName}</InvoiceName>
              <Meta>paymentId: {p.paymentId}</Meta>
            </div>

            <div>
              <Period>~ {p.dueDate}</Period>
              <DdayBadge dueDate={p.dueDate} status={p.status} />
            </div>

            <div>
              <Amount>{formatMoney(p.amount)}원</Amount>
            </div>

            <div>
              <StatusBadge status={p.status} />
            </div>

            <Actions onClick={(e) => e.stopPropagation()}>
              {p.status === "PAID" ? (
                <ActionButton data-variant="outline" onClick={() => onUnpaid(p.paymentId)}>
                  완료 취소
                </ActionButton>
              ) : (
                <ActionButton data-variant="primary" onClick={() => onPaid(p.paymentId)}>
                  납부 완료
                </ActionButton>
              )}
            </Actions>
          </Row>
        ))
      )}

      {/* 페이징/무한스크롤 자리 */}
      {hasNext && (
        <LoadMore>
          <SmallButton onClick={onLoadMore}>더 보기</SmallButton>
        </LoadMore>
      )}
    </Card>
  );
}

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 170px;
  gap: 12px;
  padding: 12px 16px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 900;
  color: #374151;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 170px;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }
`;

const InvoiceName = styled.div`
  font-weight: 900;
  color: #111827;
`;

const Meta = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #6b7280;
`;

const Period = styled.div`
  font-weight: 800;
  color: #111827;
`;

const Amount = styled.div`
  font-weight: 900;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  border-radius: 10px;
  padding: 8px 10px;
  font-weight: 900;
  cursor: pointer;

  &[data-variant="primary"] {
    border: 1px solid #2563eb;
    background: #2563eb;
    color: #ffffff;

    &:hover {
      background: #1d4ed8;
    }
  }

  &[data-variant="outline"] {
    border: 1px solid #e5e7eb;
    background: #ffffff;
    color: #111827;

    &:hover {
      background: #f9fafb;
    }
  }
`;

const Empty = styled.div`
  padding: 18px 16px;
  color: #6b7280;
`;

const LoadMore = styled.div`
  padding: 14px 16px;
  display: flex;
  justify-content: center;
`;

const SmallButton = styled.button`
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 900;

  &:hover {
    background: #f9fafb;
  }
`;