"use client";

import plane from "@/assets/images/paper-plane-origami-svgrepo-com.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SuccessPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/user/all-jobs");
  };
  return (
    <div className="p-8 text-neutral-800 font-light flex-1 flex items-center flex-col">
      <div className="relative w-24 aspect-square bg-neutral-100 rounded-full mb-2 flex items-center justify-center">
        <Image
          src={plane}
          alt="success"
          width={720}
          height={720}
          className="w-16 absolute -top-4 right-0"
        />
      </div>
      <p className="text-lg font-bold">You&apos;ve applies to this job</p>
      <Button
        onClick={handleClick}
        className="w-full max-w-[300px] py-2 font-semibold bg-blue-900 hover:bg-blue-950 mt-10"
      >
        Return to job search
      </Button>
    </div>
  );
};

export default SuccessPage;
