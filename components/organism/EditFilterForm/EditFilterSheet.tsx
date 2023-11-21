import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import React from "react";

import { EditFilterFormType } from "./edit-filter-form";
import { EditFilterForm } from ".";

type TProps = {
  data?: EditFilterFormType;
  uuid?: string;
  button: React.ReactNode;
  title: string;
};
export default function EditFilterSheet({ button, data, title, uuid }: TProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{button}</SheetTrigger>
      <SheetContent
        side="right"
        className="min-w-[90vw] md:min-w-[700px] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <EditFilterForm
          onSubmitSuccess={() => setOpen(false)}
          data={data}
          uuid={uuid}
        />
      </SheetContent>
    </Sheet>
  );
}
