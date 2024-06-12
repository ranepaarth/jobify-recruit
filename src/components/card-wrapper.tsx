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
  formFooterLabel?: string;
  formFooterHref?: string;
  showFooter?: boolean;
}

const CardWrapper = ({
  children,
  formDesc,
  formFooterHref,
  formFooterLabel,
  formLabel,
  showFooter = true,
}: CardWrapperProps) => {
  return (
    <Card className="w-fit shadow-md">
      <CardHeader>
        <CardTitle>{formLabel}</CardTitle>
        <CardDescription>{formDesc}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showFooter && (
        <CardFooter>
          <Button variant="link" asChild>
            <Link href={formFooterHref as string}>{formFooterLabel}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CardWrapper;
