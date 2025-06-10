'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/DataTable'
import {
  DocumentQueryParams,
  TDocumentOut,
  useGetDocumentsQuery,
} from '@/api/documents.api'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

/**
 * ViewAction Component - handles View Document button and routes to detail with "from" param
 */
const BookViewAction = ({ id }: { id: number }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Reconstruct current full path with query params
  const currentPath = `${pathname}?${searchParams.toString()}`

  return (
    <div className="flex justify-center">
      <Button
        size="icon"
        variant="ghost"
        title="View Document"
        onClick={() =>
          router.push(`/front-pages/books/${id}?from=${encodeURIComponent(currentPath)}`)
        }
      >
        <Eye />
      </Button>
    </div>
  )
}

/**
 * Columns for Documents Table
 */
const columns: ColumnDef<TDocumentOut>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const document = row.original
      return <div className="flex justify-center">{document.name}</div>
    },
  },
  {
    accessorKey: 'author',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Author
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const document = row.original
      return <div className="flex justify-center">{document.author.name}</div>
    },
  },
  {
    accessorKey: 'noOfSources',
    id: 'No of Sources',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        No of Sources
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const document = row.original
      return (
        <div className="flex justify-center">{document.no_of_sources}</div>
      )
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      const document = row.original
      return (
        <div className="flex justify-center">
          <BookViewAction id={document.id} />
        </div>
      )
    },
  },
]

/**
 * DocumentsTable Component
 */
interface DocumentsTableProps {
  filterParams?: DocumentQueryParams
}

export default function BookDocumentsTable({
  filterParams = {},
}: DocumentsTableProps) {
  const { data, isLoading, error } = useGetDocumentsQuery(filterParams)

  return (
    <DataTable
      title="Documents"
      columns={columns}
      data={data || []}
      isLoading={isLoading}
      error={error}
    />
  )
}
