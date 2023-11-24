"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, Plus } from "lucide-react";
import { EditSubCategorySheet } from "@/components/organism/EditSubCategoryForm";
import { AppDataTable } from "@/components/organism/AppDataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useQueryClient } from "@tanstack/react-query";
import useAppDeleteMutation from "@/hooks/useAppDeleteMutation";
import { ColumnDef } from "@tanstack/react-table";

export default function Page() {
  const client = useQueryClient();
  const deleteMutation = useAppDeleteMutation();
  const columns: ColumnDef<any>[] = [
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
      enableHiding: false,
      cell(props) {
        return (
          <EditSubCategorySheet
            title="Edit category"
            id={props.row.original.id}
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
    {
      header: "Last Updated",
      cell(props) {
        return (
          <small>
            {new Date(props.row.original.updatedAt).toLocaleString()}
          </small>
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
                  await deleteMutation.mutateAsync(
                    {
                      ids: [props.row.original.id],
                      path: "sub-categories",
                    },
                    {
                      onSuccess: () => {
                        client.invalidateQueries({
                          queryKey: ["sub-categories"],
                          type: "all",
                        });
                        client.refetchQueries({
                          queryKey: ["sub-categories"],
                          type: "all",
                        });
                      },
                    }
                  );
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
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  return (
    <div>
      <div className="mb-2 flex justify-end">
        <EditSubCategorySheet
          title="New Category"
          button={
            <Button size="sm" variant="ghost" className="">
              <Plus />
              Add Sub Category
            </Button>
          }
        />
      </div>
      <AppDataTable
        columns={columns as any}
        path="sub-categories"
        setSelectedIds={setSelectedIds}
        actions={[
          <Button
            onClick={() => {
              if (!confirm("Are you sure you want to delete these items?"))
                return;
              deleteMutation.mutateAsync(
                {
                  path: "sub-categories",
                  ids: selectedIds,
                },
                {
                  onSuccess(data) {
                    client.invalidateQueries({
                      queryKey: ["sub-categories"],
                      type: "all",
                    });
                    client.refetchQueries({
                      queryKey: ["sub-categories"],
                      type: "all",
                    });
                  },
                }
              );
            }}
          >
            Delete
          </Button>,
        ]}
      />
    </div>
  );
}
