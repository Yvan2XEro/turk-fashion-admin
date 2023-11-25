"use client";
import { DarkModeToggler } from "@/components/moleculs/DarkModeToggler";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import menuItems from "./menuItems";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type TProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AppSidebar(props: TProps) {
  const pathName = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div
      className={cn(
        "h-screen pt-14 bg-white dark:bg-slate-950 border-r px-1 dark:text-white transition-all duration-300",
        {
          "w-[250px]": !collapsed,
        }
      )}
    >
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="absolute top-4 right-0 z-30 rounded-full border dark:border-white"
      >
        {!collapsed ? <ChevronLeft /> : <ChevronRight />}
      </button>
      <div className="w-full h-full ">
        {menuItems.map((item, i) => (
          <div
            key={i}
            className={cn({
              "bg-gray-300 text-black dark:bg-slate-800 dark:text-white":
                pathName.includes(item.href),
            })}
          >
            <Link
              href={item.href}
              className={cn("flex items-center gap-4 p-2")}
            >
              {item.icon}
              {!collapsed && <Label>{item.name}</Label>}
            </Link>
          </div>
        ))}
        <div className="flex gap-4 p-2">
          <DarkModeToggler />
        </div>
      </div>
    </div>
  );
}
