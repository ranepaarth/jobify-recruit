import { getUser } from "@/lib/get-logged-in-user";
import { redirect } from "next/navigation";
import React from "react";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (user.role === "ADMIN") {
    redirect("/admin");
  }
  return <>{children}</>;
};

export default UserLayout;
