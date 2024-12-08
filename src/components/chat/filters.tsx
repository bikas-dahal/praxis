'use client'

import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { useState, useEffect } from "react";
import {  NotebookPen } from "lucide-react";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Filters = ({ totalCount = 0 }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    // Initial states from URL params
    const [sliderValue, setSliderValue] = useState(
        parseInt(searchParams.get('dateRange') || '5')
    );
    const [selectedNature, setSelectedNature] = useState<string[]>(
        (searchParams.get('nature') || 'reader,writer').split(',')
    );
    const [withPhoto, setWithPhoto] = useState(
        searchParams.get('withPhoto') !== 'false'
    );
    const [orderBy, setOrderBy] = useState(
        searchParams.get('orderBy') || 'updated'
    );

    // Order by list
    const orderByList = [
        { label: 'Last Active', value: "updated" },
        { label: 'Newest Member', value: "created" }
    ];

    // Nature list
    const natureList = [
        { value: "writer", icon: NotebookPen },
    ];

    // Update URL parameters
    const updateUrlParams = () => {
        const params = new URLSearchParams(searchParams);
        
        // Update parameters
        params.set('dateRange', sliderValue.toString());
        params.set('nature', selectedNature.join(','));
        params.set('withPhoto', withPhoto.toString());
        params.set('orderBy', orderBy);
        params.set('pageNumber', '1'); // Reset to first page

        // Navigate with new params
        router.replace(`${pathname}?${params}`);
    };

    // Effect to update URL when filters change
    useEffect(() => {
        updateUrlParams();
    }, [sliderValue, selectedNature, withPhoto, orderBy]);

    // Toggle nature selection
    const toggleNature = (nature: string) => {
        setSelectedNature(prev => 
            prev.includes(nature) 
                ? prev.filter(n => n !== nature)
                : [...prev, nature]
        );
    };

    return (
        <div className="shadow-md my-2 p-4 rounded-md bg-white">
            <div className="flex justify-between items-center">
                {/* Results Section */}
                Still need working here
                <div className="flex gap-2 items-center">
                    <div className="font-semibold text-xl">
                        Result: <span className="text-blue-500">{totalCount}</span>
                    </div>
                </div>

                {/* Nature Selection Section */}
                <div className="flex gap-4 items-center">
                    <span className="text-gray-600 font-medium">Nature:</span>
                    {natureList.map(({ icon: Icon, value }) => (
                        <Button
                            key={value}
                            variant={selectedNature.includes(value) ? "default" : "secondary"}
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => toggleNature(value)}
                        >
                            <Icon size={16} />
                            {value}
                        </Button>
                    ))}
                </div>

                {/* Slider Section */}
                <div className="flex items-center gap-4">
                    <span className="text-gray-600 font-medium">Our Member since (months):</span>
                    <div className="w-36">
                        <Slider
                            aria-label="Slider for range"
                            defaultValue={[sliderValue]}
                            min={1}
                            max={50}
                            step={1}
                            onValueChange={(value) => setSliderValue(value[0])}
                            className="cursor-pointer"
                        />
                    </div>
                    <span className="font-semibold text-blue-500">{sliderValue}</span>
                </div>

                {/* Photo Filter */}
                <div className="flex items-center gap-2">
                    <p className="text-xs">With uploaded photo</p>
                    <Switch 
                        checked={withPhoto}
                        onCheckedChange={setWithPhoto}
                    />
                </div>

                {/* Order By Dropdown */}
                <div className="flex items-center">
                    <Select 
                        value={orderBy}
                        onValueChange={setOrderBy}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Member Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {orderByList.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};