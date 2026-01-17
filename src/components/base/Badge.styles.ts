import { css } from '@emotion/react';

const variantStyles = {
  primary: css`
    background-color: #e8eeff;
    color: #4a5fdd;
  `,
  secondary: css`
    background-color: #f5f5f5;
    color: #666;
  `,
  default: css`
    background-color: #f0f0f0;
    color: #333;
  `,
  warning: css`
    background-color: #ffd8d8; /* Changed to a more vivid orange */
    color: #333; /* Changed to a deeper orange */
  `,
} as const;

export type BadgeVariant = keyof typeof variantStyles;

export const badgeStyle = (variant: BadgeVariant = 'default') => css`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  ${variantStyles[variant]}
`;
