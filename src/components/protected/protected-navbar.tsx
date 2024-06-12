import { getUser } from "@/lib/get-logged-in-user";
import React from "react";
import Logo from "./logo";
import NavLink from "./nav-link";

const ProtectedNavbar = async () => {
  const user = await getUser();
  return (
    <nav className="p-4 w-full flex items-center justify-between border-b shadow-sm">
      <Logo />
      {user.role === "ADMIN" && (
        <div>
          <NavLink href="/admin/jobs" label="Jobs" />
          <NavLink href="/admin/job-categories" label="Categories" />
        </div>
      )}
      {user.role === "USER" && (
        <div>
          <NavLink href="/user/all-jobs" label="All Jobs" />
          <NavLink href="/user/applied" label="Applied" />
          <NavLink href="/user/upload" label="Resume" />
        </div>
      )}
    </nav>
  );
};

export default ProtectedNavbar;
