import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import React from "react";

import { EditUserForm } from ".";
import { User } from "@/lib/api/users";

type TProps = {
  data?: User;
  id?: number;
  button: React.ReactNode;
  title: string;
};
export default function EditUserSheet(props: TProps) {
  const { button, data, title, id } = props;
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
        <EditUserForm
          onSubmitSuccess={() => setOpen(false)}
          data={data}
          id={id}
        />
      </SheetContent>
    </Sheet>
  );
}
