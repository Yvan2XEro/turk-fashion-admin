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
import { Menu, User } from "lucide-react";
import menuItems from "../AppSidebar/menuItems";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

export default function SheetSide() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: session } = useSession();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <Card className="p-2 my-3 flex items-center gap-8">
            <div className="h-10 w-10 rounded-full border flex items-center justify-center">
              <User size={25} />
            </div>
            <Label className="font-bold text-xl">{session?.user?.name}</Label>
          </Card>
        </SheetHeader>

        <ul className="flex flex-col space-y-2">
          {menuItems.map((item, i) => (
            <li key={i}>
              <Link
                onClick={() => setIsOpen(false)}
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
        <div className="border-t px-1 mt-4 py-2">
          <DarkModeToggler />
        </div>
      </SheetContent>
    </Sheet>
  );
}
