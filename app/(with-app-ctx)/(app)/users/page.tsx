"use client";
import { AppDataTable } from "@/components/organism/AppDataTable";
import { EditCategorySheet } from "@/components/organism/EditCategoryForm";
import EditUserSheet from "@/components/organism/EditUserForm/EditUserSheet";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import useAppDeleteMutation from "@/hooks/useAppDeleteMutation";
import { fetchWithAuth } from "@/lib/api/app-fetch";
import { User } from "@/lib/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Plus } from "lucide-react";
import React from "react";

export default function Page() {
  const client = useQueryClient();
  const deleteMutation = useAppDeleteMutation();
  const { toast } = useToast();
  const grantMutation = useMutation({
    mutationFn: (id: number) => {
      return fetchWithAuth(`/users/${id}/grant-admin`, {
        method: "PATCH",
      });
    },
    onSuccess: () => {
      toast({
        description: "User granted admin",
        title: "Success",
      });
      client.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const columns: ColumnDef<User>[] = [
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
          <EditUserSheet
            title="Edit user"
            id={props.row.original.id}
            button={
              <button className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src={
                      props.row.original.photo ||
                      "https://api.lorem.space/image/face?w=400&h=400"
                    }
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
                      path: "users",
                    },
                    {
                      onSuccess: () => {
                        client.invalidateQueries({
                          queryKey: ["users"],
                          type: "all",
                        });
                        client.refetchQueries({
                          queryKey: ["users"],
                          type: "all",
                        });
                      },
                    }
                  );
                }}
              >
                Delete
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={async () => {
                  if (
                    !confirm(
                      "Are you sure you want to grant admin access to this user?"
                    )
                  )
                    return;
                  await grantMutation.mutateAsync(props.row.original.id, {
                    onSuccess: () => {
                      client.invalidateQueries({
                        queryKey: ["users", "users/admins/all"],
                        type: "all",
                      });
                      client.refetchQueries({
                        queryKey: ["users", "users/admins/all"],
                        type: "all",
                      });
                    },
                  });
                }}
              >
                <Label className="text-red-600">Grant Admin Access</Label>
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
        <h1 className="font-bold uppercase text-xl">Users List</h1>
        <EditUserSheet
          title="New User"
          button={
            <Button size="sm" variant="ghost" className="">
              <Plus />
              Add User
            </Button>
          }
        />
      </div>
      <AppDataTable
        columns={columns as any}
        path="users"
        setSelectedIds={setSelectedIds}
        actions={
          <>
            <Button
              onClick={() => {
                if (!confirm("Are you sure you want to delete these items?"))
                  return;
                deleteMutation.mutateAsync(
                  {
                    path: "users",
                    ids: selectedIds,
                  },
                  {
                    onSuccess(data) {
                      client.invalidateQueries({
                        queryKey: ["users"],
                        type: "all",
                      });
                      client.refetchQueries({
                        queryKey: ["users"],
                        type: "all",
                      });
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
