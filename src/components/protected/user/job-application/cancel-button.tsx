"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CancelButton = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleBtnClick = (action: string) => {
    switch (action) {
      case "close":
        setOpen(false);
        break;
      case "navigate":
        router.push("/user/all-jobs");
        break;

      default:
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-blue-800 font-medium hover:bg-blue-50 hover:text-blue-800"
          variant={"ghost"}
        >
          Cancel
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] text-start rounded-lg text-neutral-800">
        <div>
          <h3 className="font-bold">Discard your application?</h3>
          <p className="text-sm font-light">
            You&apos;ll have to restart if you apply again.
          </p>
        </div>
        <hr className="mb-1" />
        <Button
          className="bg-blue-900 hover:bg-blue-950"
          onClick={() => handleBtnClick("navigate")}
        >
          Discard application
        </Button>
        <Button
          className="bg-transparent border border-neutral-700 text-blue-900 hover:bg-blue-50"
          onClick={() => handleBtnClick("close")}
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CancelButton;
