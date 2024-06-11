"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between p-4 border-b shadow-sm">
      <h3 className="text-2xl font-semibold ">Jobify 💼</h3>
      <div>
        <Link
          href={"/login"}
          className={`px-2 py-1 text-sm sm:text-base font-medium ${
            pathname === "/login" ? "underline" : "no-underline"
          }`}
        >
          Login
        </Link>
        <Link
          href={"/register"}
          className={`px-2 py-1 text-sm sm:text-base font-medium ${
            pathname === "/register" ? "underline" : "no-underline"
          }`}
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
