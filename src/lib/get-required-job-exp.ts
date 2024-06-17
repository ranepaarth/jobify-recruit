import { experience } from "@/components/protected/admin/admin-job-listing-form";

export const getRequiredJobExperience = (jobExperience: string) => {
  const jobExp = experience.filter((exp) => exp.value === jobExperience)[0];

  return jobExp;
};
