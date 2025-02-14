/**
 * this module defines the structure of the of the table for filtering
 * and ordering of tables, along with pagination. 
 * refer to the documentation of shadcn which uses react tantables
 * and shandcn for more information
 * https://ui.shadcn.com/docs/components/data-table
 */
"use client"

import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  showNameFilter?: boolean
  showRowSelected?: boolean
  noDataMessage: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showNameFilter,
  showRowSelected = false,
  noDataMessage,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  // const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value.toLowerCase();
  //   table.setColumnFilters((prev) => [
  //     {
  //       id: "user.firstName",
  //       value: value,
  //     },
  //     {
  //       id: "status",
  //       value: value,
  //     },
  //   ]);
  // };
  return (
    <div>
        <div className="flex items-center py-4">
            {showNameFilter && (
            <div>
                <Input
                placeholder="Find customer..."
                value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("status")?.setFilterValue(event.target.value)
                }
                // onChange={handleFilterChange}
                className="max-w-sm"
                />
            </div>
            )}

        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
            Columns
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            {table
            .getAllColumns()
            .filter(
                (column) => column.getCanHide()
            )
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
                )
            })}
        </DropdownMenuContent>
        </DropdownMenu>

    </div>
      
        <div className="rounded-md border">
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
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table?.getRowModel().rows?.length ? (
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
                    {/* No results. */}
                  {noDataMessage}
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>
            <div className="flex items-center justify-end space-x-2 py-4">
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
            Previous
            </Button>
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
            Next
            </Button>
      </div>
      {showRowSelected && (
        <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      )}
    </div>
  )
}
