import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import React from "react";

import { EditSubCategoryFormType } from "./form-props";
import { EditSubCategoryForm } from ".";

type TProps = {
  data?: EditSubCategoryFormType;
  uuid?: string;
  button: React.ReactNode;
  title: string;
};
export default function EditSubCategorySheet({
  button,
  data,
  title,
  uuid,
}: TProps) {
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
        <EditSubCategoryForm
          onSubmitSuccess={() => setOpen(false)}
          data={data}
          uuid={uuid}
        />
      </SheetContent>
    </Sheet>
  );
}
