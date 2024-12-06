"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import {
  GitCompareArrowsIcon,
  LoaderPinwheel,
  LogOutIcon,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import { logOut } from "@/actions/auth/logout";
import Link from "next/link";
import { getUserImage } from "@/actions/auth/settings";
import { toast } from "react-toastify";

export const UserButton = () => {
  const currentUser = useCurrentUser();
  const { id, name, email } = currentUser || {};
  const [userImage, setUserImage] = useState<string>("/images/avatar.png");
  const [loading, setLoading] = useState(true);

  if (!currentUser) {
    return redirect("/auth/login");
  }

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (!id) {
          throw new Error("User ID not found");
        }

        const image = await getUserImage(id); // Fetch user image from server
        setUserImage(image || "/images/avatar.png"); // Fallback to default image
      } catch (err: any) {
        toast.error(err.message || "Error fetching user image");
        setUserImage("/images/avatar.png"); // Fallback on error
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none relative">
          <Avatar className="size-10 hover:opacity-75 transition border border-neutral-400">
            {loading ? (
              <Loading />
            ) : (
              <Image
                src={userImage}
                alt={name || "User Avatar"}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="flex flex-col justify-center items-center px-2.5 py-4">
            <Avatar className="size-[52px] border border-neutral-400">
              <Image
                src={userImage}
                alt={name || "User Avatar"}
                width={52}
                height={52}
                className="rounded-full object-cover"
              />
            </Avatar>
            <div className="flex flex-col pt-4 items-center justify-center">
              <p className="text-sm font-medium text-neutral-900">
                {name || "User"}
              </p>
              <p className="text-xs text-neutral-500">{email}</p>
            </div>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem>
              <GitCompareArrowsIcon className="w-4 h-4 mr-2" />
              <Link href="/dashboard/settings">
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div
                className="flex items-center justify-center cursor-pointer hover:bg-transparent"
                onClick={() => logOut()}
              >
                <LogOutIcon className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Loading = () => (
  <div className="size-10 rounded-full flex items-center justify-center bg-neutral-100 border border-neutral-400">
    <LoaderPinwheel className="size-5 animate-spin text-muted-foreground" />
  </div>
);
