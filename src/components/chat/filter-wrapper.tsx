'use client'

import { usePathname } from "next/navigation";
import { Filters } from "./filters";

export const FilterWrapper = ( {totalCount} : {totalCount: number}) => {
    const pathname = usePathname();

    if (pathname === '/dashboard/chat') {
        return (
            <div>
                <Filters totalCount={totalCount} />
            </div>
        )
    }

    return null;
}