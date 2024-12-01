'use client'

import { Button } from "../ui/button"
import { getUserSession } from "@/actions/auth/session";
import { logOut } from "@/actions/auth/logout";

export const DashboardHeader = async({ user }: any) => {

    const onClick =  async() => {
        await logOut();
    }

    return (
        <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <Button onClick={onClick}>
          Logout
        </Button>
      </header>
    )
}