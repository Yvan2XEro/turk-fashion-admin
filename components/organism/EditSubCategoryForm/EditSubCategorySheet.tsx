import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import React from "react";

import { EditSubCategoryForm } from ".";
import { SubCategoryPayload } from "@/lib/api/sub-categories";

type TProps = {
  data?: SubCategoryPayload;
  id?: number;
  button: React.ReactNode;
  title: string;
};
export default function EditSubCategorySheet({
  button,
  data,
  title,
  id,
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
          id={id}
        />
      </SheetContent>
    </Sheet>
  );
}
