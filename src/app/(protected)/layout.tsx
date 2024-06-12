import ProtectedNavbar from "@/components/protected/protected-navbar";
import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <ProtectedNavbar />
      <section className="flex-1 flex w-full justify-center mt-10 p-4 px-8 max-w-screen-xl mx-auto">
        {children}
      </section>
    </main>
  );
};

export default ProtectedLayout;
