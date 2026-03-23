import api from "../../../api/axios";

export type PaymentStatus = "PENDING" | "PAID" | "OVERDUE";

export type PayResponseDTO = {
  paymentId: number;
  invoiceName: string;      // 청구서 이름
  dueDate: string;          // YYYY-MM-DD
  amount: string;           // BigDecimal이면 문자열로 내려오는 경우가 많음
  status: PaymentStatus;
  paidAt: string | null;    // ISO datetime or null
};

export const getPayments = async () => {
  const { data } = await api.get<PayResponseDTO[]>(`/payment-service/api/v1/payments/`);
  return data;
};

export const markPaid = async (paymentId: number) => {
  const { data } = await api.patch<PayResponseDTO>(`/payment-service/api/v1/payments/${paymentId}/paid`);
  return data;
};

export const markUnpaid = async (paymentId: number) => {
  const { data } = await api.patch<PayResponseDTO>(`/payment-service/api/v1/payments/${paymentId}/unpaid`);
  return data;
};

export const deletePayment = async (paymentId: number) => {
  const { data } = await api.delete<PayResponseDTO>(`/payment-service/api/v1/payments/${paymentId}/delete`);
  return data;
};