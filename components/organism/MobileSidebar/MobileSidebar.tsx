"use client";

import { DarkModeToggler } from "@/components/moleculs/DarkModeToggler";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import menuItems from "../AppSidebar/menuItems";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function SheetSide() {
  const pathName = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
        </SheetHeader>

        <ul className="flex flex-col space-y-2">
          {menuItems.map((item, i) => (
            <li key={i}>
              <Link
                href={item.href}
                className={cn("flex items-center gap-4 p-1  rounded ", {
                  "bg-gray-300 text-black dark:bg-slate-800 dark:text-white":
                    pathName.includes(item.href),
                })}
              >
                {item.icon}
                <Label>{item.name}</Label>
              </Link>
            </li>
          ))}
        </ul>
        <SheetFooter>
          <DarkModeToggler />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
