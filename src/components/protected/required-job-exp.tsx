"use client";

import { getRequiredJobExperience } from "@/lib/get-required-job-exp";
import React from "react";

const RequiredJobExp = ({ experienceReq }: { experienceReq: string }) => {
  const jobExp = getRequiredJobExperience(experienceReq);
  return <>{jobExp.expInYear}</>;
};

export default RequiredJobExp;
