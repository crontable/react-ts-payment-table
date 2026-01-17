import { badgeStyle, type BadgeVariant } from './Badge.styles';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

function Badge({ children, variant = 'default' }: BadgeProps) {
  return <span css={badgeStyle(variant)}>{children}</span>;
}

export default Badge;
