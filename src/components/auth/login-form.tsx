"use client";

import { loginAction } from "@/actions/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schema/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CardWrapper from "../card-wrapper";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";
import FormButton from "./form-button";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      loginAction(values).then((data: any) => {
        setError(data?.error);
        setSuccess(data?.success as string);
      });
    });
  };

  return (
    <CardWrapper
      formDesc="Welcome back"
      formLabel="Login"
      formFooterHref="/register"
      formFooterLabel="Create account"
    >
      <Form {...form}>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError error={error as string} />
              <FormSuccess success={success} />
              <FormButton buttonLabel="Login" isPending={isPending} />
            </div>
          </form>
          <Button variant={"link"}>
            <Link href={"/forgot-password"}>Forgot Password</Link>
          </Button>
        </Form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
