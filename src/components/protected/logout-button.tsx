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
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";

const LogoutButton = ({
  userEmail,
  userName,
}: {
  userEmail: string;
  userName: string;
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
        <DropdownMenuItem>
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

export default LogoutButton;
{
  /* */
}
