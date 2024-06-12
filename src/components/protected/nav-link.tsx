"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavLinkProps = {
  href: string;
  label: string;
};
const NavLink = ({ href, label }: NavLinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`px-2 py-1 text-sm sm:text-base font-medium ${
        pathname === href ? "underline" : "no-underline"
      }`}
    >
      {label}
    </Link>
  );
};

export default NavLink;
