"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, Plus } from "lucide-react";
import { EditProductSheet } from "@/components/organism/EditProductForm";
import useAppDeleteMutation from "@/hooks/useAppDeleteMutation";
import { AppDataTable } from "@/components/organism/AppDataTable";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Label } from "@radix-ui/react-label";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/lib/api/products";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const client = useQueryClient();
  const deleteMutation = useAppDeleteMutation();
  const columns: ColumnDef<Product>[] = [
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
          <EditProductSheet
            title="Edit Product"
            id={props.row.original.id}
            button={
              <button className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src={props.row.original.photoUrl}
                    alt={props.row.original.name}
                  />
                </Avatar>
                <div>
                  <Label className="cursor-pointer block">
                    {props.row.original.name.substring(0, 16) + "..."}
                  </Label>
                  <Badge>
                    {props.row.original.subCategory.category.name} /{" "}
                    {props.row.original.subCategory.name}
                  </Badge>
                </div>
              </button>
            }
            data={props.row.original}
          />
        );
      },
    },
    {
      header: "Count in Stock",
      cell(props) {
        return <div>{props.row.original.currentStock}</div>;
      },
    },
    {
      header: "Status",
      cell(props) {
        return (
          <div>
            <Badge
              variant={
                props.row.original.status === "active" ? "default" : "outline"
              }
              className="uppercase"
            >
              {props.row.original.status}
            </Badge>
          </div>
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
                      path: "products",
                    },
                    {
                      onSuccess: () => {
                        client.invalidateQueries({
                          queryKey: ["products"],
                          type: "all",
                        });
                        client.refetchQueries({
                          queryKey: ["products"],
                          type: "all",
                        });
                      },
                    }
                  );
                }}
              >
                Delete
              </DropdownMenuItem>
              {props.row.original.status !== "active" ? (
                <DropdownMenuItem onClick={async () => {}}>
                  Activate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={async () => {}}>
                  Deactivate
                </DropdownMenuItem>
              )}
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
        <EditProductSheet
          title="New Product"
          button={
            <Button size="sm" variant="ghost" className="">
              <Plus />
              Add Sub Product
            </Button>
          }
        />
      </div>
      <AppDataTable
        columns={columns as any}
        path="products"
        setSelectedIds={setSelectedIds}
        actions={[
          <Button
            onClick={() => {
              if (!confirm("Are you sure you want to delete these items?"))
                return;
              deleteMutation.mutateAsync(
                {
                  path: "products",
                  ids: selectedIds,
                },
                {
                  onSuccess(data) {
                    client.invalidateQueries({
                      queryKey: ["products"],
                      type: "all",
                    });
                    client.refetchQueries({
                      queryKey: ["products"],
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
