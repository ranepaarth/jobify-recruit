import { getUser } from "@/lib/get-logged-in-user";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const user = await getUser();
  if (user?.role === "User") {
    redirect("/user");
  }
  if (user?.role === "Admin") {
    redirect("/admin");
  }

  return (
    <main className="w-full max-w-screen-lg mx-auto py-8 px-4 min-h-screen flex flex-col">
      <h2 className="text-2xl font-extrabold text-neutral-800 md:text-4xl">
        Jobify 💼
      </h2>
      <div className="mt-32 flex flex-col gap-4">
        <p className="text-5xl font-extrabold">
          Job <span className="px-1 text-blue-900">Posting</span> App
        </p>
        <p className="md:text-lg font-light text-balance w-[90%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          adipisci quo harum qui enim eveniet corrupti fugiat asperiores, cumque
          distinctio? Nulla, voluptates. Quis, repellat doloremque.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={"/login"}
            className="bg-blue-900 text-white font-semibold px-4 py-2 text-lg rounded-md hover:bg-blue-950"
          >
            Login
          </Link>
          <Link
            href={"/register"}
            className="text-blue-900 bg-transparent border-blue-900 font-semibold px-4 py-2 text-lg rounded-md border-2 hover:bg-blue-50"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
