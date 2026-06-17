import type { AnchorHTMLAttributes, ReactNode } from "react";

type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

/** Full-page navigation — required for static-export sites on Vercel. */
export default function NavLink({ href, children, ...props }: NavLinkProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
