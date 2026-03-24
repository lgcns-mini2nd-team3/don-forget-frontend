import { useState } from "react";
import { useNavigate, Link } from "react-router";
import styled from "@emotion/styled";
import { Button } from "../components/Button";
import api from "../api/axios";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await api.post("/user-service/api/v1/auth/login", { email, password });
    const token = res.data.access; // 키 확인 필요
    localStorage.setItem("token", token);
    navigate("/");
  } catch (err) {
    console.error("로그인 실패:", err);
  }
};

  return (
    <Page>
      <Card>
        <Header>
          <Avatar>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </Avatar>

          <Title>로그인</Title>
          <Subtitle>계정에 로그인하여 시작하세요</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </Field>

          <Field>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </Field>

          <Row>
            <RememberLabel>
              <Checkbox type="checkbox" />
              <RememberText>로그인 상태 유지</RememberText>
            </RememberLabel>

            <ForgotLink href="#">비밀번호 찾기</ForgotLink>
          </Row>

          {/* Button 컴포넌트가 className을 지원하면 유지해도 되고,
              아래처럼 Wrapper를 써도 됩니다. */}
          <FullWidth>
            <Button type="submit" variant="primary" size="lg" className="w-full">
              로그인
            </Button>
          </FullWidth>
        </Form>

        <Footer>
          <FooterText>
            계정이 없으신가요? <SignupLink to="/signup">회원가입</SignupLink>
          </FooterText>
        </Footer>
      </Card>
    </Page>
  );
}

/** Emotion styled */

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* bg-gradient-to-br from-blue-50 to-blue-100 */
  background: linear-gradient(to bottom right, #eff6ff, #dbeafe);
`;

const Card = styled.div`
  width: 100%;
  max-width: 28rem; /* max-w-md */
  background: #ffffff;
  border-radius: 1rem; /* rounded-2xl */
  padding: 2rem; /* p-8 */
  /* shadow-2xl */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem; /* mb-8 */
`;

const Avatar = styled.div`
  width: 4rem; /* w-16 */
  height: 4rem; /* h-16 */
  border-radius: 9999px;
  background: #2563eb; /* bg-blue-600 */
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem; /* mb-4 */
`;

const Title = styled.h1`
  margin: 0 0 0.5rem 0; /* mb-2 */
  font-size: 1.875rem; /* text-3xl */
  line-height: 2.25rem;
  font-weight: 700; /* font-bold */
  color: #111827; /* text-gray-900 */
`;

const Subtitle = styled.p`
  margin: 0;
  color: #4b5563; /* text-gray-600 */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* space-y-6 */
`;

const Field = styled.div``;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem; /* mb-2 */
  font-size: 0.875rem; /* text-sm */
  line-height: 1.25rem;
  font-weight: 500; /* font-medium */
  color: #374151; /* text-gray-700 */
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem 1rem; /* py-3 px-4 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.5rem; /* rounded-lg */
  outline: none;

  &:focus {
    border-color: transparent; /* focus:border-transparent */
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 1); /* focus:ring-2 focus:ring-blue-500 */
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RememberLabel = styled.label`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  width: 1rem; /* w-4 */
  height: 1rem; /* h-4 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.25rem;
  accent-color: #2563eb; /* text-blue-600 느낌 */
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 1); /* focus:ring-blue-500 */
  }
`;

const RememberText = styled.span`
  margin-left: 0.5rem; /* ml-2 */
  font-size: 0.875rem; /* text-sm */
  line-height: 1.25rem;
  color: #4b5563; /* text-gray-600 */
`;

const ForgotLink = styled.a`
  font-size: 0.875rem; /* text-sm */
  line-height: 1.25rem;
  font-weight: 500; /* font-medium */
  color: #2563eb; /* text-blue-600 */
  text-decoration: none;

  &:hover {
    color: #1d4ed8; /* hover:text-blue-700 */
  }
`;

const FullWidth = styled.div`
  width: 100%;
`;

const Footer = styled.div`
  margin-top: 1.5rem; /* mt-6 */
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #4b5563; /* text-gray-600 */
`;

const SignupLink = styled(Link)`
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: #1d4ed8;
  }
`;