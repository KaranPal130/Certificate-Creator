"use client"
import { useState, useEffect } from "react";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SideNav } from "@/components/shared/side-nav";
import { NavItems } from "@/components/constants/side-nav";

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <div className="flex items-center justify-center gap-2">
                        <MenuIcon />
                        <h1 className="text-lg font-semibold">Certifacate Creation</h1>
                    </div>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                    <div className="px-1 py-6 pt-16">
                        <SideNav items={NavItems} />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};