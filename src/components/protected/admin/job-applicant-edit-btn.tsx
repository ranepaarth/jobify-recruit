"use client";

import { updateApplicationStatus } from "@/actions/update-application";
import FormButton from "@/components/auth/form-button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UpdateApplicationStatusSchema } from "@/schema/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Application } from "./admin-job-applications-list";

const JobApplicantEditBtn = ({ application }: { application: Application }) => {
  const form = useForm<z.infer<typeof UpdateApplicationStatusSchema>>({
    resolver: zodResolver(UpdateApplicationStatusSchema),
    defaultValues: {
      status: application.applicationStatus,
      rejectMessage: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (values: z.infer<typeof UpdateApplicationStatusSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");
    startTransition(() => {
      updateApplicationStatus(values, application.id).then((data) => {
        setError(data.error as string);
        setSuccess(data.success as string);
        if (data.success) {
          form.reset();
          setOpen(false);
          setSuccess("");
        }
        if (data.error) {
          setOpen(true);
        }
      });
    });
  };

  const watchStatus = form.watch("status");

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="text-neutral-600 p-0">
          <span className="text-blue-900 transition-opacity duration-200 ease-in-out hover:bg-blue-100 rounded">
            <EditIcon className="w-4 h-4" />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="border-b-2 border-blue-800 w-fit pb-1 mb-5">
            Update the Application Status
          </DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6 w-full text-start">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Application status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Applied">
                            Applicant has applied to this job
                          </SelectItem>
                          <SelectItem value="Accepted">
                            Proceed with the application
                          </SelectItem>
                          <SelectItem value="Rejected">
                            Reject the application
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {watchStatus === "Rejected" && (
                  <FormField
                    name="rejectMessage"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your message here"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a suitable reason for rejecting the
                          application
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {/* {status === "Rejected" && (
                  <FormField
                    name="rejectMessage"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your message here"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a suitable reason for rejecting the
                          application
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )} */}
                <FormError error={error} />
                <FormSuccess success={success} />
                <FormButton buttonLabel="Update" isPending={isPending} />
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicantEditBtn;
