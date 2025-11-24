import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

type AttendanceRecord = {
  id: number
  agentId: number
  date: string
  shift: string | null
  checkInTime: string | null
  checkOutTime: string | null
  status: string
  isAttend: boolean
  isLate: boolean
  lateMinutes: number
  createdAt: string
  updatedAt: string
  agent: {
    id: number
    name: string
    email: string
  }
  breaks: {
    id: number
    attendanceId: number
    startTime: string
    endTime: string
    duration: number
    createdAt: string
    updatedAt: string
  }[]
}

interface AttendanceTableProps {
  data: AttendanceRecord[]
}

const formatTime = (iso: string | null) => {
  if (!iso) return "--:--"
  return format(new Date(iso), "hh:mm a")
}

const formatDate = (iso: string) => format(new Date(iso), "dd MMM yyyy")

export default function AttendanceTable({ data }: AttendanceTableProps) {
  const columns: ColumnDef<AttendanceRecord>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => formatDate(row.original.date),
    },
    {
      accessorKey: "shift",
      header: "Shift",
      cell: ({ row }) => (
        <Badge variant={row.original.shift ? "outline" : "secondary"}>
          {row.original.shift || "N/A"}
        </Badge>
      ),
    },
    {
      id: "checkInOut",
      header: "Check-in / Check-out",
      cell: ({ row }) => {
        const { checkInTime, checkOutTime } = row.original
        return (
          <div className="flex flex-col gap-1 text-sm">
            <span>
              <span className="font-medium">In:</span> {formatTime(checkInTime)}
            </span>
            <span>
              <span className="font-medium">Out:</span> {formatTime(checkOutTime)}
            </span>
          </div>
        )
      },
    },
    {
      id: "breaks",
      header: "Breaks",
      cell: ({ row }) => {
        const breaks = row.original.breaks
        if (!breaks.length) return <span className="text-muted-foreground">—</span>
        return (
          <div className="flex flex-col gap-1 text-sm">
            {breaks.map((b) => (
              <div key={b.id} className="flex items-center gap-2">
                <span>
                  {formatTime(b.startTime)} – {formatTime(b.endTime)}
                </span>
                <Badge
                  variant={b.duration > 40 ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {b.duration} min
                </Badge>
              </div>
            ))}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        const isLate = row.original.isLate
        return (
          <div className="flex items-center gap-2">
            <Badge
              variant={status === "PRESENT" ? "default" : "destructive"}
            >
              {status}
            </Badge>
            {isLate && (
              <Badge variant="outline" className="text-orange-600">
                Late ({row.original.lateMinutes} min)
              </Badge>
            )}
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="max-w-5xl mx-auto w-full rounded-md border my-16">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No attendance records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
