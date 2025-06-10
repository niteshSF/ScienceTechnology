import { useState } from "react"
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
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TableSkeleton from "@/components/TableSkeleton"
import { cn } from "@/lib/utils"

interface DataTableProps<TData> {
  title: string
  columns: ColumnDef<TData>[]
  data: TData[]
  isLoading: boolean
  error?: Error | null
  enableColumnVisibility?: boolean
}

export default function DataTable<TData>({
  columns,
  data,
  isLoading,
  error,
  enableColumnVisibility = true,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
  })

  if (isLoading) {
    return (
      <Card className="max-w-7xl mx-auto">
        <CardContent className="pt-6">
          <TableSkeleton />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="max-w-7xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-destructive">{error.message}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-7xl mx-auto">
      <CardContent className="pt-1">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative bg-white rounded-lg ">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search in all columns..."
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="pl-8 max-w-sm text-black"
                />
              </div>
            </div>
            {enableColumnVisibility && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      const headerLabel =
                        typeof column.columnDef.header === "string"
                          ? column.columnDef.header
                          : column.id

                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {headerLabel}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-center text-white font-bold"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="bg-purple-900 bg-opacity-80 font-semibold tracking-wider text-white hover:bg-gray-600 transition-colors"
                    >
                      {/* {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))} */}

                      {row.getVisibleCells().map((cell, cellIndex) => (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            // "text-center",
                            "text-center py-0.5", // reduced padding
                            cellIndex === 0 && "rounded-l-lg", // first cell
                            cellIndex === row.getVisibleCells().length - 1 &&
                              "rounded-r-lg" // last cell
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center w-full mx-auto
                      bg-purple-900 bg-opacity-80 font-semibold tracking-wider text-white hover:bg-gray-600 transition-colors rounded-xl
                      "
                    >
                      No results
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between space-x-2 py-2">
            <div className="text-sm text-white font-bold">
              Showing {table.getFilteredRowModel().rows.length} row(s).
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="go to first page"
                title={
                  !table.getCanPreviousPage()
                    ? "Already in first page"
                    : "Go to first page"
                }
              >
                <ChevronFirst />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="go to previous page"
                title={
                  !table.getCanPreviousPage()
                    ? "Already in first page"
                    : "Go to previous page"
                }
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="go to next page"
                title={
                  !table.getCanNextPage()
                    ? "Already in last page"
                    : "Go to next page"
                }
              >
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
                aria-label="go to last page"
                title={
                  !table.getCanNextPage()
                    ? "Already in last page"
                    : "Go to last page"
                }
              >
                <ChevronLast />
              </Button>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-sm text-muted-foreground">
                <p className="text-nowrap text-white font-semibold">
                  Page <b>{table.getState().pagination.pageIndex + 1}</b> of{" "}
                  <b>{table.getPageCount()}</b>
                </p>
              </div>
              <Select
                value={table.getState().pagination.pageSize.toString()}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="w-[100px] bg-white font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                      Show {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
