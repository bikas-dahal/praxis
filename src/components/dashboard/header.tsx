'use client';
import { Button } from "../ui/button";
// import { logOut } from "@/actions/auth/logout";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Sidebar } from "../sidebar";

export const DashboardHeader = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Function to handle mouse move event
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Trigger sheet when mouse is within 10 pixels of the left screen edge
    if (e.clientX <= 10) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener('mousemove', handleMouseMove);
    
    // Close the sidebar whenever the route changes
    setIsOpen(false);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [pathname, handleMouseMove]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 m-0 w-30 border-none" side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};