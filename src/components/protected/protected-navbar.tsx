import { getUser } from "@/lib/get-logged-in-user";
import React from "react";
import Logo from "./logo";
import NavLink from "./nav-link";
import UserAvatarButton from "./user-avatar-button";

const ProtectedNavbar = async () => {
  const user = await getUser();
  return (
    <nav className="p-4 w-full flex items-center justify-between border-b shadow-sm">
      <Logo />
      <div className="flex items-center gap-2">
        {user.role === "Admin" && (
          <>
            <NavLink href="/admin/jobs" label="Jobs" />
            <NavLink href="/admin/job-categories" label="Categories" />
          </>
        )}
        {user.role === "User" && (
          <>
            <NavLink href="/user/all-jobs" label="All Jobs" />
            <NavLink href="/user/applied" label="Applied" />
          </>
        )}
        <UserAvatarButton
          userEmail={user.email as string}
          userName={user.name as string}
        />
      </div>
    </nav>
  );
};

export default ProtectedNavbar;
