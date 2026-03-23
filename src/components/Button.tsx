import { ReactNode } from "react";
import styled from "@emotion/styled";

type Variant = "primary" | "secondary" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ variant: Variant; size: Size }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.5rem; /* rounded-lg */
  font-weight: 500; /* font-medium */
  transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;

  outline: none;

  /* focus:outline-none focus:ring-2 focus:ring-offset-2 */
  &:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.9), 0 0 0 4px rgba(255, 255, 255, 1);
  }

  /* size */
  ${({ size }) => {
    switch (size) {
      case "sm":
        return `
          padding: 0.375rem 0.75rem; /* px-3 py-1.5 */
          font-size: 0.875rem;       /* text-sm */
          line-height: 1.25rem;
        `;
      case "md":
        return `
          padding: 0.5rem 1rem;      /* px-4 py-2 */
          font-size: 1rem;
          line-height: 1.5rem;
        `;
      case "lg":
        return `
          padding: 0.75rem 1.5rem;   /* px-6 py-3 */
          font-size: 1.125rem;       /* text-lg */
          line-height: 1.75rem;
        `;
      default:
        return "";
    }
  }}

  /* variant */
  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
          background: #2563eb; /* blue-600 */
          color: #ffffff;

          &:hover {
            background: #1d4ed8; /* blue-700 */
          }

          &:focus {
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(255, 255, 255, 1);
          }
        `;
      case "secondary":
        return `
          background: #4b5563; /* gray-600 */
          color: #ffffff;

          &:hover {
            background: #374151; /* gray-700 */
          }

          &:focus {
            box-shadow: 0 0 0 2px rgba(107, 114, 128, 1), 0 0 0 4px rgba(255, 255, 255, 1);
          }
        `;
      case "outline":
        return `
          background: transparent;
          border: 2px solid #d1d5db; /* gray-300 */
          color: #374151; /* gray-700 */

          &:hover {
            background: #f9fafb; /* gray-50 */
          }

          &:focus {
            box-shadow: 0 0 0 2px rgba(107, 114, 128, 1), 0 0 0 4px rgba(255, 255, 255, 1);
          }
        `;
      case "danger":
        return `
          background: #dc2626; /* red-600 */
          color: #ffffff;

          &:hover {
            background: #b91c1c; /* red-700 */
          }

          &:focus {
            box-shadow: 0 0 0 2px rgba(239, 68, 68, 1), 0 0 0 4px rgba(255, 255, 255, 1);
          }
        `;
      default:
        return "";
    }
  }}
`;