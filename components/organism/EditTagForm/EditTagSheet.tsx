import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import React from "react";

import { EditTagFormType } from "./form-props";
import { EditTagForm } from ".";

type TProps = {
  data?: EditTagFormType;
  id?: number;
  button: React.ReactNode;
  title: string;
};
export default function EditTagSheet({ button, data, title, id }: TProps) {
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
        <EditTagForm
          onSubmitSuccess={() => setOpen(false)}
          data={data}
          id={id}
        />
      </SheetContent>
    </Sheet>
  );
}
