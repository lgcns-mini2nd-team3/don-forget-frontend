import styled from "@emotion/styled";
import { PayResponseDTO } from "../api/payments";
import { formatMoney } from "../utils/paymentUtils";
import { StatusBadge } from "./Badges";

type Props = {
  open: boolean;
  loading?: boolean;
  payment: PayResponseDTO | null;
  onClose: () => void;

  // TODO: 통신 연결 지점
  onPaid: (paymentId: number) => void;
  onUnpaid: (paymentId: number) => void;
};

export function PaymentDetailModal({
  open,
  loading = false,
  payment,
  onClose,
  onPaid,
  onUnpaid,
}: Props) {
  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <Panel onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>납부 상세</Title>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </Header>

        {loading ? (
          <Body>불러오는 중...</Body>
        ) : !payment ? (
          <Body>상세 정보를 불러올 수 없습니다.</Body>
        ) : (
          <Body>
            <Row>
              <Label>청구서</Label>
              <Value>{payment.invoiceName}</Value>
            </Row>
            <Row>
              <Label>마감일</Label>
              <Value>{payment.dueDate}</Value>
            </Row>
            <Row>
              <Label>금액</Label>
              <Value>{formatMoney(payment.amount)}원</Value>
            </Row>
            <Row>
              <Label>상태</Label>
              <Value>
                <StatusBadge status={payment.status} />
              </Value>
            </Row>
            <Row>
              <Label>납부 완료 시각</Label>
              <Value>{payment.paidAt ?? "-"}</Value>
            </Row>

            <Actions>
              {payment.status === "PAID" ? (
                <ActionButton data-variant="outline" onClick={() => onUnpaid(payment.paymentId)}>
                  완료 취소
                </ActionButton>
              ) : (
                <ActionButton data-variant="primary" onClick={() => onPaid(payment.paymentId)}>
                  납부 완료
                </ActionButton>
              )}
            </Actions>
          </Body>
        )}
      </Panel>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 50;
`;

const Panel = styled.div`
  width: 100%;
  max-width: 560px;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
`;

const Header = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: 900;
  color: #111827;
`;

const CloseButton = styled.button`
  border: 1px solid #e5e7eb;
  background: #ffffff;
  border-radius: 10px;
  padding: 8px 10px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }
`;

const Body = styled.div`
  padding: 16px;
  color: #6b7280;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-of-type {
    border-bottom: none;
  }
`;

const Label = styled.div`
  color: #6b7280;
  font-weight: 800;
`;

const Value = styled.div`
  color: #111827;
  font-weight: 800;
`;

const Actions = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ActionButton = styled.button`
  border-radius: 10px;
  padding: 8px 10px;
  font-weight: 800;
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