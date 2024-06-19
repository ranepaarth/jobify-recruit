import { getUser } from "@/lib/get-logged-in-user";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (user.role === "User") {
    redirect("/user");
  }
  return <>{children}</>;
};

export default AdminLayout;
