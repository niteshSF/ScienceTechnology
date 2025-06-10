interface TableSkeletonProps {
  columnLength?: number
}

const TableSkeleton = ({ columnLength = 5 }: TableSkeletonProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto bg-white p-4 rounded-lg shadow-md">
      {/* Search and Column Selector Skeleton */}
      <div className="flex items-center py-4">
        <div className="h-10 w-80 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-28 bg-gray-200 rounded animate-pulse ml-auto" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-md border">
        <div className="divide-y divide-gray-200">
          {/* Header Row */}
          <div className="bg-gray-50">
            <div className="grid grid-cols-5 gap-4 py-3">
              {[...Array(columnLength)].map((_, index) => (
                <div
                  key={`header-${index}`}
                  className="h-6 bg-gray-200 rounded animate-pulse mx-4"
                />
              ))}
            </div>
          </div>

          {/* Body Rows */}
          {[...Array(columnLength)].map((_, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="grid grid-cols-5 gap-4 py-4"
            >
              {[...Array(columnLength)].map((_, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="h-5 bg-gray-200 rounded animate-pulse mx-4"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="flex space-x-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={`pagination-${index}`}
              className="h-8 w-8 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default TableSkeleton
