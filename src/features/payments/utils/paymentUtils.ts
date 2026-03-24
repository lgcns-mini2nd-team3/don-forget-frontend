import { PaymentStatus } from "../api/payments";

export function diffDaysFromToday(dateStr: string) {
  const today = new Date();
  const due = new Date(dateStr + "T00:00:00");
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffMs = due.getTime() - t.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function formatMoney(amountStr: string) {
  const n = Number(amountStr);
  if (Number.isNaN(n)) return amountStr;
  return new Intl.NumberFormat("ko-KR").format(n);
}

export function getDdayLabel(dueDate: string, status: PaymentStatus) {
  if (status === "PAID") return null;

  const d = diffDaysFromToday(dueDate);
  if (d < 0) return "OVERDUE";
  if (d === 0) return "D-day";
  if (d === 1) return "D-1";
  if (d <= 3) return `D-${d}`;
  return null;
}