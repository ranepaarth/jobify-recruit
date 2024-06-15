"use client";

import { applyToJob } from "@/actions/job-application";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { useMultiStepForm } from "@/hook/useMultiStepForm";
import { JobApplicationSchema } from "@/schema/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobPost } from "@prisma/client";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AboutJob from "./job-application/about-job";
import CancelButton from "./job-application/cancel-button";
import UploadResumeForm from "./upload-resume-form";

const JobApplication = ({
  resumeUrl,
  job,
  hasApplied,
}: {
  resumeUrl: string;
  job: JobPost;
  hasApplied: boolean;
}) => {
  const { step, next, back, isFirstStep, isLastStep } = useMultiStepForm([
    <UploadResumeForm resumeUrl={resumeUrl} key="upload-resume-form" />,
    <AboutJob job={job} key="about-job" />,
  ]);

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof JobApplicationSchema>>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: {
      resumeUrl,
      jobId: job.id,
    },
  });

  const onSubmit = (values: z.infer<typeof JobApplicationSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");
    startTransition(async () => {
      applyToJob(values).then((data) => {
        setError(data.error as string);
        setSuccess(data.success as string);
        // TODO: If Success ==> Navigate to SuccessPage
      });
    });
  };

  return (
    <div className="flex flex-col w-full max-w-[500px] justify-between gap-4 h-auto">
      <div className="flex items-center justify-between">
        {isLastStep && (
          <Button
            onClick={back}
            variant={"ghost"}
            className="w-fit text-neutral-600 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            back
          </Button>
        )}
        {isFirstStep && (
          <div className="text-start">
            <p className="font-semibold">{job.title}</p>
            <p className="text-xs font-light text-neutral-700">
              {job.companyName}
            </p>
          </div>
        )}
        <CancelButton />
      </div>

      <hr className="border border-blue-800" />

      <div className="w-full min-h-[80dvh]">{step}</div>
      {isFirstStep && (
        <Button className="bg-blue-900 w-full hover:bg-blue-950" onClick={next}>
          Continue
        </Button>
      )}
      {isLastStep && (
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2"
        >
          {success && <FormSuccess success={success} />}
          {error && <FormError error={error} />}
          <Button
            className="bg-blue-900 hover:bg-blue-950 w-full"
            disabled={hasApplied || isPending || !!success}
          >
            {isPending && <Loader2 className="animate-spin" />}
            {hasApplied && "Applied"}
            {!isPending && !hasApplied && "Submit"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default JobApplication;
