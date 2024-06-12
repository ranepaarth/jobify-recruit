import { getUser } from "@/lib/get-logged-in-user";
import Link from "next/link";
import React from "react";

const Logo = async () => {
  const user = await getUser();

  const isAdmin = user.role === "ADMIN";

  return (
    <Link href={`${isAdmin ? "/admin" : "/user"}`}>
      <h3 className="text-2xl font-semibold ">Jobify 💼</h3>
    </Link>
  );
};

export default Logo;
