'use client';

import { Button } from "@/components/ui/button";

interface PaginationComponentProps {
    totalCount: number;
    currentPage: number;
    pageSize: number;
}

export const PaginationComponent = ({
    totalCount,
    currentPage,
    pageSize
}: PaginationComponentProps) => {
    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className="border-t-2 w-full mt-4">
            <div className="flex justify-between items-center p-2">
                <div>
                    <span className="text-gray-600 font-medium">
                        Showing {(currentPage - 1) * pageSize + 1}-
                        {Math.min(currentPage * pageSize, totalCount)} of {totalCount} results
                    </span>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i}
                            variant={currentPage === i + 1 ? 'default' : 'outline'}
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
                <div>
                    <span className="text-gray-600 font-medium mr-2">Results per page:</span>
                    <select
                        value={pageSize}
                        className="border-2 border-gray-200 rounded-md p-1"
                    >
                        <option value={2}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>
        </div>
    );
};