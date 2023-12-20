"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, Plus } from "lucide-react";
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
import { useQueryClient } from "react-query";
import useAppDeleteMutation from "@/hooks/useAppDeleteMutation";
import { ColumnDef } from "@tanstack/react-table";
import { EditFilterSheet } from "@/components/organism/EditFilterForm";
import { Badge } from "@/components/ui/badge";
import { Filter } from "@/lib/api/filters";

export default function Page() {
  const client = useQueryClient();
  const deleteMutation = useAppDeleteMutation();
  const columns: ColumnDef<Filter>[] = [
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
          <EditFilterSheet
            title="Edit Filter"
            id={props.row.original.id}
            button={
              <button className="flex items-center space-x-3">
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
      header: "Values",
      accessorKey: "values",
      cell(props) {
        return (
          <div className="flex gap-1 flex-wrap">
            {props.row.original.values.map((v, i) => (
              <Badge key={i}>{v}</Badge>
            ))}
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
                      path: "filters",
                    },
                    {
                      onSuccess: () => {
                        client.invalidateQueries(["filters"]);
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
      <div className="mb-2 flex justify-between">
        <h1 className="font-bold uppercase text-xl">Filters List</h1>
        <EditFilterSheet
          title="New Filter"
          button={
            <Button size="sm" variant="ghost" className="">
              <Plus />
              Add Filter
            </Button>
          }
        />
      </div>
      <AppDataTable
        columns={columns as any}
        path="filters"
        setSelectedIds={setSelectedIds}
        actions={
          <>
            <Button
              onClick={() => {
                if (!confirm("Are you sure you want to delete these items?"))
                  return;
                deleteMutation.mutateAsync(
                  {
                    path: "filters",
                    ids: selectedIds,
                  },
                  {
                    onSuccess(data) {
                      client.invalidateQueries(["filters"]);
                    },
                  }
                );
              }}
            >
              Delete
            </Button>
          </>
        }
      />
    </div>
  );
}
