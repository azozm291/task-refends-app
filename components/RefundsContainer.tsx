'use client';

import { useRouter } from "next/navigation";
import { Table,type Column } from "./Table";
import { RefundOrder } from "@/types";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { RefundForm } from "./RefundForm";
import { useCallback, useState } from "react";
import CustomPagaintion from "./CustomPagaintion";

interface IProps{
    refundOrders:RefundOrder[];
    totalPages:number;
    page:number;
}


const columns: Column<RefundOrder>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Reason", accessorKey: "reason" },
    { header: "Store", accessorKey: "store_name" },
    {
      header: "Store Logo",
      accessorKey: "store_logo",
      cell: (item) => <Image src={ "/placeholder.svg"} alt={item.store_name} width={32} height={32} className="w-8 h-8 object-cover" />,
    },
    { header: "Amount", accessorKey: "amount", cell: (item) => `$${item.amount.toFixed(2)}` },
    { header: "Status", accessorKey: "active", cell: (item) => (item.active ? "Active" : "Inactive") },
    { header: "Decision", accessorKey: "decision", cell: (item) => item.decision ? item.decision : "Not yet" },
    { header: "Items", accessorKey: "items", cell: (item) => item.items.length },
  ]

const RefundsContainer = ({refundOrders,totalPages,page}:IProps) => { 
  const router = useRouter()
  const [isModalOpen,setIsModalOpen] = useState(false)


  
  const handleViewDetails = (id: string) => {
    router.push(`/refunds/${id}`)
  }
  const handlePageChange = useCallback((page: number) => {
    router.push(`/refunds?page=${page}`); // Update the URL with the new page
},[router]);

  return (
    <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
        <h1 className="text-2xl font-bold mb-4">Refund Orders</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>Add New Refund</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] overflow-auto">
            <DialogHeader>
              <DialogTitle>Add New Refund</DialogTitle>
            </DialogHeader>
            <RefundForm onSuccess={() => setIsModalOpen(false)} />
          </DialogContent>
        </Dialog>
        </div>
      <Table
        data={refundOrders}
        columns={columns}
        onViewDetails={handleViewDetails}
      />
      {totalPages > 1 && <CustomPagaintion handlePageChange={handlePageChange} currentPage={page} totalPages={totalPages} />}
    </div>
  )
}

export default RefundsContainer
