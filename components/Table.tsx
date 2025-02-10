'use client';
import type React from "react"
import { Table as ShadcnTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import {  useTransition } from "react";
import { updateRefundDecision, updateRefundStatus } from "@/actions/refunds.action";
import { useToast } from "@/hooks/use-toast";

export type Column<T> = {
  header: string
  accessorKey: keyof T
  cell?: (item: T) => React.ReactNode
}

type TableProps<T> = {
  data: T[]
  columns: Column<T>[]
//   onDecisionChange: (id: string, decision: string) => void
//   onStatusChange: (id: string, active: boolean) => void
  onViewDetails: (id: string) => void
}

export function Table<T extends { id: string; decision: string }>({
  data,
  columns,
  onViewDetails,
}: TableProps<T>) {
    const [isPending,startTransition] = useTransition();
    const {toast} = useToast();
    
    const onDecisionChange = (id: string, decision: string) => {
        startTransition(async () => {
          try {
            const result = await updateRefundDecision(id, decision)
            if (result.success) {
              toast({
                title: "Success",
                description: result.message,
              })
            } else {
              throw new Error(result.message)
            }
          } catch (error) {
            toast({
              title: "Error",
              description: error instanceof Error ? error.message : "Failed to update decision",
              variant: "destructive",
            })
          }
        })
      }
    
      const onStatusChange = (id: string, active: boolean) => {
        startTransition(async () => {
          try {
            const result = await updateRefundStatus(id, active)
            if (result.success) {
              toast({
                title: "Success",
                description: result.message,
              })
            } else {
              throw new Error(result.message)
            }
          } catch (error) {
            toast({
              title: "Error",
              description: error instanceof Error ? error.message : "Failed to update status",
              variant: "destructive",
            })
          }
        })
      }
  return (
    <ShadcnTable>
      <TableHeader>
        <TableRow>
          {columns?.map((column) => (
            <TableHead key={column.header}>{column.header}</TableHead>
          ))}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item) => (
          <TableRow key={item.id}>
            {columns?.map((column) => (
              <TableCell key={column.accessorKey as string}>
                {column.cell ? column.cell(item) : (item[column.accessorKey] as React.ReactNode)}
              </TableCell>
            ))}
            <TableCell>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                    {item?.decision }<ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {["reject", "accept", "escalate"].map((decision) => (
                      <DropdownMenuItem key={decision} disabled={isPending} onClick={() => onDecisionChange(item.id, decision)}>
                        {decision}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Switch
                disabled={isPending}
                  checked={(item as any).active}
                  onCheckedChange={(checked) => onStatusChange(item.id, checked)}
                />
                <Button size="sm" variant="outline" onClick={() => onViewDetails(item.id)}>
                  View Details
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </ShadcnTable>
  )
}

