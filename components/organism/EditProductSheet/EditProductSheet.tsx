import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import React from "react";

type TProps = {
  children: React.ReactNode;
  button: React.ReactNode;
  title: string;
};
export default function EditProductSheet({ button, children, title }: TProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{button}</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
