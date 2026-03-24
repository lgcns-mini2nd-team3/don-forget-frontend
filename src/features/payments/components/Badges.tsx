import styled from "@emotion/styled";
import { PaymentStatus } from "../api/payments";
import { getDdayLabel } from "../utils/paymentUtils";

export function StatusBadge({ status }: { status: PaymentStatus }) {
  return <Badge data-status={status}>{status}</Badge>;
}

export function DdayBadge({ dueDate, status }: { dueDate: string; status: PaymentStatus }) {
  const label = getDdayLabel(dueDate, status);
  if (!label) return null;

  const tone = label === "OVERDUE" || label === "D-day" ? "danger" : "warning";
  return <SmallBadge data-tone={tone}>{label}</SmallBadge>;
}

const Badge = styled.span`
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 12px;

  &[data-status="PENDING"] {
    background: #eff6ff;
    color: #1d4ed8;
  }
  &[data-status="PAID"] {
    background: #ecfdf5;
    color: #047857;
  }
  &[data-status="OVERDUE"] {
    background: #fef2f2;
    color: #b91c1c;
  }
`;

const SmallBadge = styled.span`
  display: inline-flex;
  margin-top: 6px;
  padding: 4px 8px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 12px;

  &[data-tone="warning"] {
    background: #fffbeb;
    color: #b45309;
  }
  &[data-tone="danger"] {
    background: #fef2f2;
    color: #b91c1c;
  }
`;