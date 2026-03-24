import api from "./axios";

export type TemplateCategory =
  | "UTILITY"
  | "TELECOM"
  | "INSURANCE"
  | "EDUCATION"
  | "CARD_FINANCE"
  | "TRANSPORT"
  | "SUBSCRIPTION"
  | "OTHER";

export interface Template {
  templateId: number;
  name: string;
  category: TemplateCategory;
  isSystem: boolean;
}

export interface TemplateRequest {
  name: string;
  category: TemplateCategory;
  isSystem: boolean;
}

export const getTemplates = async (category?: string) => {
  const response = await api.get<Template[]>("template-service/api/v1/templates", {
    params: category ? { category } : {},
  });
  return response.data;
};

export const createTemplate = async (payload: TemplateRequest) => {
  const response = await api.post<Template>("template-service/api/v1/templates", payload);
  return response.data;
};

export const updateTemplate = async (
  templateId: number,
  payload: TemplateRequest
) => {
  const response = await api.patch<Template>(
    `template-service/api/v1/templates/${templateId}`,
    payload
  );
  return response.data;
};

export const deleteTemplate = async (templateId: number) => {
  await api.delete(`template-service/api/v1/templates/${templateId}`);
};