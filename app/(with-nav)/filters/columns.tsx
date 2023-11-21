"use client";

import { EditCategorySheet } from "@/components/organism/EditCategoryForm";
import { EditFilterSheet } from "@/components/organism/EditFilterForm";
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
import { deleteMultipleCategories } from "@/lib/categories";
import { deleteMultipleFilters } from "@/lib/filters";
import { Filter } from "@/types/models";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";

export const columns: ColumnDef<Filter>[] = [
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
        <EditFilterSheet
          title="Edit Filter"
          uuid={props.row.original.uuid}
          button={
            <button className="flex items-center space-x-3">
              <Label className="cursor-pointer">
                {props.row.original.label}
              </Label>
            </button>
          }
          data={props.row.original}
        />
      );
    },
  },
  {
    header: "Values",
    accessorKey: "values",
    cell(props) {
      return (
        <div className="flex flex-wrap gap-2">
          {props.row.original.values.map((value) => (
            <Badge key={value} variant="outline">
              {value}
            </Badge>
          ))}
        </div>
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
                await deleteMultipleFilters([props.row.original.uuid]);
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
