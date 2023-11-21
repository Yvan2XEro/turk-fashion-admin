"use client";

import { EditCategorySheet } from "@/components/organism/EditCategoryForm";
import { EditProductSheet } from "@/components/organism/EditProductForm";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { updateProductsStatus } from "@/lib/products";
import { Category } from "@/types/models";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";

export const columns: ColumnDef<Category>[] = [
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
    accessorKey: "name",
    cell(props) {
      return (
        <EditCategorySheet
          title="Edit category"
          uuid={props.row.original.uuid}
          button={
            <button className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage
                  src={props.row.original.photoUrl}
                  alt={props.row.original.name}
                />
              </Avatar>
              <Label className="cursor-pointer">
                {props.row.original.name.substring(0, 16) + "..."}
              </Label>
            </button>
          }
          data={props.row.original}
        />
      );
    },
  },
  // {
  //   accessorKey: "price",
  //   header: "Price",
  // },
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
                await deleteMultipleCategories([props.row.original.uuid]);
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
