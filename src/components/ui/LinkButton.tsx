import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";
import { buttonClassName, type ButtonVariant } from "./Button";

type Props = Omit<LinkProps, "href"> & {
  href: LinkProps["href"];
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

export function LinkButton({ href, variant = "primary", className, children, ...props }: Props) {
  return (
    <Link href={href} className={buttonClassName({ variant, className })} {...props}>
      {children}
    </Link>
  );
}
