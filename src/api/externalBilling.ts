import api from "./axios"; 

export interface ExternalBill {
  id: number;
  billId: string;
  amount: number;
  createdAt: string;
}

//외부 고지서 수집 내역 가져오기 (GET)
export const getExternalBillingHistory = async () => {
  const response = await api.get<ExternalBill[]>("/external-billing-service/api/v1/external/history");
  return response.data;
};

// 외부 고지서 수집 테스트용 (POST)
export const sendExternalBilling = async (payload: { billId: string; amount: number }) => {
  const response = await api.post("/external-billing-service/api/v1/external/send", payload);
  return response.data;
};