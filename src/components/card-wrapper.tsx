"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  formLabel: string;
  formDesc: string;
  formFooterLabel: string;
  formFooterHref: string;
}

const CardWrapper = ({
  children,
  formDesc,
  formFooterHref,
  formFooterLabel,
  formLabel,
}: CardWrapperProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{formLabel}</CardTitle>
        <CardDescription>{formDesc}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button variant="link" asChild>
          <Link href={formFooterHref}>{formFooterLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
