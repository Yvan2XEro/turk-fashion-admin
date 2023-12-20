"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React, { useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash,
} from "lucide-react";
import { useQuery } from "react-query";
import { universalFetch } from "@/lib/api/universalfetch";
import { AppLoader } from "@/components/moleculs/AppLoader";
import { DefaultObject } from "@/types/models";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface DataTableProps<T extends DefaultObject> {
  columns: ColumnDef<T>[];
  path: string;
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  actions: React.ReactNode;
}

export default function AppDataTable(props: DataTableProps<DefaultObject>) {
  const { columns, path } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rerender = React.useReducer(() => ({}), {})[1];

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  //   Visibility and sorting
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Search params
  const page = searchParams?.get("page") ?? "1";
  const limit = searchParams?.get("limit") ?? "10";

  //   Data fetching
  const { data, isLoading } = useQuery({
    queryFn: () =>
      universalFetch({
        path: `/${path}`,
        page: +page || 1,
        limit: +limit || 20,
      }),
    queryKey: [path, page, limit],
  });

  //  Selected objects
  const selectedIds = useMemo(() => {
    if (!data?.data) return [];
    const indices = Object.keys(rowSelection).map((e) => +e);

    return data.data
      .filter((_, index) => indices.includes(index))
      .map((e) => e.id);
  }, [rowSelection, data]);

  useEffect(() => props.setSelectedIds(selectedIds), [selectedIds, props]);

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: Number(page) - 1,
      pageSize: Number(limit),
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const pagesCount = React.useMemo(() => {
    if (!data?.meta.count) return 0;
    return Math.ceil(data?.meta.count / +limit);
  }, [data?.meta.count, limit]);

  const canPreviousPage = React.useMemo(() => pageIndex > 0, [pageIndex]);
  const canNextPage = React.useMemo(
    () => pageIndex < pagesCount - 1,
    [pageIndex, pagesCount]
  );

  const nextPage = React.useCallback(() => {
    if (canNextPage) {
      setPagination((old) => ({ ...old, pageIndex: old.pageIndex + 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, canNextPage]);
  const previousPage = React.useCallback(() => {
    if (canPreviousPage) {
      setPagination((old) => ({ ...old, pageIndex: old.pageIndex - 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, canPreviousPage]);

  const goToPage = React.useCallback((pageIndex: number) => {
    setPagination((old) => ({ ...old, pageIndex }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        limit: pageSize,
      })}`
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize]);

  const table = useReactTable({
    data: data?.data || [],
    columns,
    manualPagination: true,
    enableRowSelection: true,
    manualSorting: true,
    manualFiltering: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
  });

  if (isLoading) return <AppLoader />;

  return (
    <div className="rounded-md border">
      <div className="flex items-center p-4 gap-2">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <Card className="flex justify-between gap-2 rounded-none p-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex gap-1">
          {selectedIds.length > 0 && props.actions}
        </div>
      </Card>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2 flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(0)}
            disabled={!canPreviousPage}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <ChevronLeft />
          </Button>
          {!!pagesCount && (
            <Label className="hidden md:inline-block">
              Page {table.getState().pagination.pageIndex + 1} of {pagesCount}
            </Label>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(pagesCount - 1)}
            disabled={!canNextPage}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
