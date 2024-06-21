"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { File, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { UserRole } from "@prisma/client";

const UserAvatarButton = ({
  userEmail,
  userName,
  userRole
}: {
  userEmail: string;
  userName: string;
  userRole:UserRole
}) => {
  const firstName = userName.slice(0, 1);
  const handleButtonClick = () => {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="border p-0.5">
          <AvatarImage
            src={`https://api.dicebear.com/8.x/open-peeps/svg?seed=${userEmail}`}
            className="rounded-full w-10"
          />
          <AvatarFallback className="border border-input bg-white hover:bg-secondary">
            {firstName}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        {userRole === "User" && <DropdownMenuItem>
          <Link href={"/user/upload"} className="flex items-center w-full">
            <File className="h-4 w-4 mr-2" />
            Resume
          </Link>
        </DropdownMenuItem>}
        <DropdownMenuItem className="text-destructive">
          <button
            className="flex items-center w-full"
            onClick={handleButtonClick}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatarButton;