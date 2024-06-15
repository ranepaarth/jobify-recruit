"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const JobApplyButton = ({
  jobId,
  hasApplied,
}: {
  jobId: string;
  hasApplied: boolean;
}) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.replace(`/user/all-jobs/${jobId}`);
  };
  return (
    <Button
      className="bg-blue-900 hover:bg-blue-950 text-sm w-full"
      onClick={handleNavigate}
      disabled={hasApplied}
    >
      {hasApplied ? (
        "Applied"
      ) : (
        <>
          Apply now <ExternalLink className="w-4 h-4 ml-2" />
        </>
      )}
    </Button>
  );
};

export default JobApplyButton;
