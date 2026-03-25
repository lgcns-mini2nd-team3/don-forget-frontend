import { useState } from "react";
import { useNavigate, Link } from "react-router";
import styled from "@emotion/styled";
import { Button } from "../components/Button";
import api from "../api/axios";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 8) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    api.post("/user-service/api/v1/users/signup", {
      name,
      email,
      password
    })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error("회원가입 실패:", err);
        setError("회원가입에 실패했습니다. 다시 시도해주세요.");
      });

  };

  return (
    <Page>
      <Card>
        <Header>
          <Avatar>
            <UserPlusIcon>+</UserPlusIcon>
          </Avatar>
          <Title>회원가입</Title>
          <Subtitle>새로운 계정을 만들어보세요</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              required
            />
          </Field>

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
              minLength={8}
            />
          </Field>

          <Field>
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </Field>

          {error && <ErrorBox>{error}</ErrorBox>}

          <TermsRow>
            <Checkbox type="checkbox" id="terms" required />
            <TermsText htmlFor="terms">
              <TermsLink href="#">이용약관</TermsLink> 및{" "}
              <TermsLink href="#">개인정보처리방침</TermsLink>에 동의합니다
            </TermsText>
          </TermsRow>

          <FullWidth>
            {/* 버튼 컴포넌트가 variant에 purple이 없어서, className으로 커스텀 하던 걸 styled wrapper로 대체 */}
            <BLueButton type="submit" variant="primary" size="lg">
              회원가입
            </BLueButton>
          </FullWidth>
        </Form>

        <Footer>
          <FooterText>
            이미 계정이 있으신가요? <FooterLink to="/login">로그인</FooterLink>
          </FooterText>
        </Footer>
      </Card>
    </Page>
  );
}

/** ===== styled (Emotion) ===== */

const UserPlusIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #4a90e2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #1c3d5a;
  }
`;


const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #eff6ff, #dbeafe); /* blue-50 -> blue-100 */
`;

const Card = styled.div`
  width: 100%;
  max-width: 28rem; /* max-w-md */
  background: #ffffff;
  border-radius: 1rem; /* rounded-2xl */
  padding: 2rem; /* p-8 */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-2xl */
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem; /* mb-8 */
`;

const Avatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 9999px;
  background: #9333ea; /* purple-600 */
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  margin: 0 0 0.5rem 0;
  font-size: 1.875rem; /* text-3xl */
  line-height: 2.25rem;
  font-weight: 700;
  color: #111827;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #4b5563;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* space-y-5 느낌 */
`;

const Field = styled.div``;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;

  &:focus {
    border-color: transparent;
    box-shadow: 0 0 0 2px rgba(168, 85, 247, 1); /* purple-500 ring */
  }
`;

const ErrorBox = styled.div`
  background: #fef2f2;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
`;

const TermsRow = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  margin-top: 0.25rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  accent-color: #9333ea;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(168, 85, 247, 1);
  }
`;

const TermsText = styled.label`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #4b5563;
`;

const TermsLink = styled.a`
  color: #9333ea;
  text-decoration: none;

  &:hover {
    color: #7e22ce; /* purple-700 */
  }
`;

const FullWidth = styled.div`
  width: 100%;
`;

const BLueButton = styled(Button)`
  width: 100%;

  /* 기존: className="w-full !bg-purple-600 hover:!bg-purple-700" 대체 */
  background:  rgba(59, 130, 246, 0.9) !important;

  &:hover {
    background:  rgba(59, 130, 246, 0.9) !important;
  }
`;

const Footer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #4b5563;
`;

const FooterLink = styled(Link)`
  color: #9333ea;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: #7e22ce;
  }
`;