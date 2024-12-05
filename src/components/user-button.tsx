'use client';

import { useCurrentUser } from "@/hooks/use-current-user";
import { LoaderPinwheel, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { logOut } from "@/actions/auth/logout";

export const UserButton = () => {
  const currentUser = useCurrentUser();
  const { name, email } = currentUser || {};

  if (!currentUser) {
    return redirect("/auth/login");
  }

  console.log("currentUser", currentUser);

  const image =
    currentUser?.image || '/images/avatar.png';
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <DropdownMenu>
          <DropdownMenuTrigger className={"outline-none relative"}>
            <Avatar className={"size-10 hover:opacity-75 transition border border-neutral-400"}>
              <Image
                src={image}
                alt={name || "User Avatar"}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className={"flex flex-col justify-center items-center px-2.5 py-4"}>
              <Avatar className={"size-[52px] border border-neutral-400"}>
                <Image
                  src={ image || '/images/avatar.png'}
                  alt={name || "User Avatar"}
                  width={52}
                  height={52}
                  className="rounded-full object-cover"
                />
              </Avatar>
              <div className={"flex flex-col pt-4 items-center justify-center"}>
                <p className={"text-sm font-medium text-neutral-900"}>{name || "User"}</p>
                <p className={"text-xs text-neutral-500"}>{email}</p>
              </div>
              <DropdownMenuSeparator className={"my-1"} />
              <DropdownMenuItem
                onClick={() => logOut()}
                className={"h-10 flex items-center justify-center text-amber-800 font-medium cursor-pointer"}
              >
                <LogOut className={"size-5 mr-2"} />
                Logout
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </Suspense>
    </div>
  );
};

const Loading = () => {
  return (
    <div className={"size-10 rounded-full flex items-center justify-center bg-neutral-100 border border-neutral-400"}>
      <LoaderPinwheel className={"size-5 animate-spin text-muted-foreground"} />
    </div>
  );
};
