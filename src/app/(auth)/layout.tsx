import Navbar from "@/components/navbar";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col flex-1 min-h-screen">
      <Navbar />
      <section className="flex-1 flex items-center justify-center max-w-screen-xl mx-auto w-full px-4">
        <div className="w-full max-w-[400px]">{children}</div>
      </section>
    </main>
  );
};

export default AuthLayout;
