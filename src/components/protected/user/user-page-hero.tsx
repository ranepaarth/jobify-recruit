import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const UserPageHero = () => {
  return (
    <div className="w-full">
      <p className="text-4xl font-extrabold text-neutral-800 md:text-5xl">
        Get your <span className="text-blue-800">Dream Job</span> Today
      </p>
      <p className="text-base text-neutral-600 font-light max-w-[500px] md:text-lg mt-5">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste tempora
        natus quibusdam vero deserunt consectetur eos perferendis dolorem,
        laboriosam, optio, totam itaque incidunt omnis placeat eius dolorum
        ducimus reprehenderit officia.
      </p>
      <div className="mt-10 space-x-2 md:text-lg">
        <Link href="/user/all-jobs">
          <Button className="bg-blue-900 hover:bg-blue-950">Apply now</Button>
        </Link>
        <Link href="/user/upload">
          <Button className="bg-transparent text-blue-900 border-2 border-blue-900 hover:bg-blue-50">
            Upload Resume
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserPageHero;
