"use client";

import { createJobPostAction } from "@/actions/create-job";
import FormButton from "@/components/auth/form-button";
import CardWrapper from "@/components/card-wrapper";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateJobPostSchema } from "@/schema/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Category } from "../../../../types";

export const experience = [
  {
    expInYear: "0-1",
    value: "zeroToOne",
  },
  {
    expInYear: "1-2",
    value: "oneToTwo",
  },
  {
    expInYear: "2-3",
    value: "twoToThree",
  },
  {
    expInYear: ">3",
    value: "moreThanThree",
  },
];

export const jobType = ["Part-Time", "Full-Time", "Internship"];

type AdminJobListingFormProps = {
  category: Category;
};

const AdminJobListingForm = ({ category }: AdminJobListingFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateJobPostSchema>>({
    resolver: zodResolver(CreateJobPostSchema),
    defaultValues: {
      category: category.name,
      companyDesc: "",
      companyName: "",
      jobDesc: "",
      salary: "",
      skills: "",
      title: "",
      type: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateJobPostSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      createJobPostAction(values).then((data) => {
        setError(data.error);
        setSuccess(data.success as string);
        form.reset();
      });
    });
  };

  return (
    <CardWrapper
      formDesc="Create a new job posting"
      formLabel="Job Posting"
      showFooter={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Google"
                        {...field}
                        {...form.register("companyName")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyDesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About the company</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the company in about 50-100 words"
                        {...field}
                        {...form.register("companyDesc")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Job title"
                        {...field}
                        {...form.register("title")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobDesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder=""
                        {...field}
                        {...form.register("jobDesc")}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe about the responsibilities and requirements for
                      the job.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Category</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        disabled
                        {...form.register("category")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Job Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {jobType.map((data) => (
                            <SelectItem value={data} key={data}>
                              {data}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual CTC</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="15 LPA"
                      {...field}
                      {...form.register("salary")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills required</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Html, Css, Javascript, etc."
                        {...field}
                        {...form.register("skills")}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter skills required relevant to this job post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience required</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience required for this job" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {experience.map((data) => (
                          <SelectItem value={data.value} key={data.value}>
                            {data.expInYear} Years
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <FormError error={error as string} />
              <FormSuccess success={success} />
              <FormButton isPending={isPending} buttonLabel="Create job post" />
            </div>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default AdminJobListingForm;
