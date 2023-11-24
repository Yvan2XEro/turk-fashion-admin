"use client";

import EditTagSheet from "@/components/organism/EditTagForm/EditTagSheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { deleteMultipleTags } from "@/lib/tags";
import { TagObj } from "@/types/models";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";

export const columns: ColumnDef<TagObj>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "label",
    cell(props) {
      return (
        <EditTagSheet
          title="Edit Filter"
          id={props.row.original.id}
          button={
            <Label className="cursor-pointer">{props.row.original.label}</Label>
          }
          data={props.row.original}
        />
      );
    },
  },
  {
    header: "Actions",
    cell(props) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={async () => {
                if (!confirm("Are you sure you want to delete this item?"))
                  return;
                await deleteMultipleTags([props.row.original.id]);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
