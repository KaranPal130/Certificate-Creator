import { GraduationCap, BadgeInfo } from "lucide-react";
import { type NavItem } from "@/types";

export const NavItems: NavItem[] = [
    {
        title: "Create Certificate",
        icon: GraduationCap,
        href: "/",
        color: "text-sky-500"
    },
    {
        title: "List Certificates",
        icon: BadgeInfo,
        href: "/verify",
        color: "text-sky-500"
    }

]