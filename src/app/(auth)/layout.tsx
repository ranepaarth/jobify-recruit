import Navbar from "@/components/navbar";
import { getUser } from "@/lib/get-logged-in-user";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (user && user.role === "Admin") {
    redirect("/admin");
  }
  if (user && user.role === "User") {
    redirect("/user");
  }
  return (
    <main className="flex flex-col flex-1 min-h-screen">
      <Navbar />
      <section className="flex-1 flex items-center justify-center max-w-screen-xl mx-auto w-full px-4">
        <div className="w-full max-w-[500px] p-4">{children}</div>
      </section>
    </main>
  );
};

export default AuthLayout;
