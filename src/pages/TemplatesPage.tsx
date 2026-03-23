import React, { useEffect, useState } from "react";
import {
  Template,
  TemplateCategory,
  createTemplate,
  deleteTemplate,
  getTemplates,
  updateTemplate,
} from "../api/templates";

const categories: TemplateCategory[] = [
  "UTILITY",
  "TELECOM",
  "INSURANCE",
  "EDUCATION",
  "CARD_FINANCE",
  "TRANSPORT",
  "SUBSCRIPTION",
  "OTHER",
];

const categoryLabelMap: Record<TemplateCategory, string> = {
  UTILITY: "공과금",
  TELECOM: "통신",
  INSURANCE: "보험",
  EDUCATION: "교육",
  CARD_FINANCE: "카드/금융",
  TRANSPORT: "교통",
  SUBSCRIPTION: "구독",
  OTHER: "기타",
};

const TemplatesPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState<TemplateCategory>("UTILITY");
  const [isSystem, setIsSystem] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (categoryQuery?: string) => {
    try {
      setLoading(true);
      const data = await getTemplates(categoryQuery);
      setTemplates(data);
    } catch (error) {
      console.error(error);
      alert("템플릿 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setName("");
    setCategory("UTILITY");
    setIsSystem(true);
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("이름을 입력하세요.");
      return;
    }

    try {
      if (editingId) {
        await updateTemplate(editingId, { name, category, isSystem });
      } else {
        await createTemplate({ name, category, isSystem });
      }

      resetForm();
      fetchData(selectedCategory);
    } catch (error) {
      console.error(error);
      alert("저장에 실패했습니다.");
    }
  };

  const handleEdit = (template: Template) => {
    setEditingId(template.templateId);
    setName(template.name);
    setCategory(template.category);
    setIsSystem(template.isSystem);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (templateId: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteTemplate(templateId);
      fetchData(selectedCategory);
    } catch (error) {
      console.error(error);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f8fb",
        padding: "40px 24px",
        fontFamily:
          "'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Template Service
          </p>
          <h1
            style={{
              margin: "8px 0 0",
              fontSize: "36px",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            템플릿 관리
          </h1>
          <p
            style={{
              marginTop: "10px",
              color: "#6b7280",
              fontSize: "15px",
            }}
          >
            청구서 템플릿을 등록하고, 카테고리별로 조회하고, 수정 및 삭제할 수 있습니다.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2
              style={{
                margin: "0 0 18px",
                fontSize: "22px",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              {editingId ? "템플릿 수정" : "템플릿 등록"}
            </h2>

            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  템플릿 이름
                </label>
                <input
                  type="text"
                  placeholder="예: 전기세, 넷플릭스"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #d1d5db",
                    fontSize: "15px",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  카테고리
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TemplateCategory)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #d1d5db",
                    fontSize: "15px",
                    background: "#fff",
                  }}
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {categoryLabelMap[item]}
                    </option>
                  ))}
                </select>
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "15px",
                  color: "#374151",
                  fontWeight: 500,
                }}
              >
                <input
                  type="checkbox"
                  checked={isSystem}
                  onChange={(e) => setIsSystem(e.target.checked)}
                />
                시스템 기본 템플릿 여부
              </label>

              <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    border: "none",
                    background: editingId ? "#f59e0b" : "#2563eb",
                    color: "#fff",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {editingId ? "수정하기" : "등록하기"}
                </button>

                <button
                  onClick={resetForm}
                  style={{
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    color: "#374151",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  초기화
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2
              style={{
                margin: "0 0 18px",
                fontSize: "22px",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              카테고리 필터
            </h2>

            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  카테고리 선택
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #d1d5db",
                    fontSize: "15px",
                    background: "#fff",
                  }}
                >
                  <option value="">전체</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {categoryLabelMap[item]}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => fetchData(selectedCategory)}
                  style={{
                    border: "none",
                    background: "#111827",
                    color: "#fff",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  조회
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory("");
                    fetchData();
                  }}
                  style={{
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    color: "#374151",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  전체 보기
                </button>
              </div>

              <div
                style={{
                  marginTop: "8px",
                  padding: "14px 16px",
                  borderRadius: "14px",
                  background: "#f9fafb",
                  color: "#6b7280",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                카테고리별로 템플릿을 빠르게 분류해서 조회할 수 있습니다.
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
            border: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              템플릿 목록
            </h2>
            <span
              style={{
                background: "#eef2ff",
                color: "#4338ca",
                padding: "8px 12px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              총 {templates.length}개
            </span>
          </div>

          {loading ? (
            <p style={{ color: "#6b7280" }}>불러오는 중...</p>
          ) : templates.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "50px 20px",
                color: "#6b7280",
                background: "#f9fafb",
                borderRadius: "16px",
              }}
            >
              데이터가 없습니다.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  overflow: "hidden",
                  borderRadius: "16px",
                }}
              >
                <thead>
                  <tr style={{ background: "#f3f4f6" }}>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>이름</th>
                    <th style={thStyle}>카테고리</th>
                    <th style={thStyle}>시스템 여부</th>
                    <th style={thStyle}>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map((template) => (
                    <tr key={template.templateId}>
                      <td style={tdStyle}>{template.templateId}</td>
                      <td style={tdStyle}>{template.name}</td>
                      <td style={tdStyle}>
                        <span
                          style={{
                            background: "#eff6ff",
                            color: "#1d4ed8",
                            padding: "6px 10px",
                            borderRadius: "999px",
                            fontSize: "13px",
                            fontWeight: 700,
                          }}
                        >
                          {categoryLabelMap[template.category]}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        {template.isSystem ? "true" : "false"}
                      </td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => handleEdit(template)}
                          style={{
                            border: "none",
                            background: "#f59e0b",
                            color: "#fff",
                            padding: "8px 12px",
                            borderRadius: "10px",
                            fontWeight: 700,
                            cursor: "pointer",
                            marginRight: "8px",
                          }}
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(template.templateId)}
                          style={{
                            border: "none",
                            background: "#ef4444",
                            color: "#fff",
                            padding: "8px 12px",
                            borderRadius: "10px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  padding: "14px 16px",
  textAlign: "left",
  fontSize: "14px",
  color: "#374151",
  fontWeight: 700,
  borderBottom: "1px solid #e5e7eb",
};

const tdStyle: React.CSSProperties = {
  padding: "14px 16px",
  fontSize: "15px",
  color: "#111827",
  borderBottom: "1px solid #f1f5f9",
  background: "#fff",
};

export default TemplatesPage;