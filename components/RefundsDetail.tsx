"use client";

import { RefundOrder } from "@/types";
import Image from "next/image";
import {
  Table,
  TableBody,

  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
 



interface IProps {
  order: RefundOrder;
}

const RefundsDetail = ({ order }: IProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p>
            <strong>ID:</strong> {order?.id}
          </p>
          <p>
            <strong>Reason:</strong> {order?.reason}
          </p>
          <p>
            <strong>Store:</strong> {order?.store_name}
          </p>
          <p>
            <strong>Store URL:</strong> {order?.store_url}
          </p>
          <p>
            <strong>Amount:</strong> ${order?.amount.toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong> {order?.active ? "Active" : "Inactive"}
          </p>
          <p>
            <strong>Decision:</strong> {order?.decision || "Not yet"}
          </p>
        </div>
        <div>
          {/* <Image src={order.store_logo || "/placeholder.svg"} alt={order?.store_name} priority={true} quality={85} width={128} height={128} className="w-32 h-32 object-cover" /> */}
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">Order Items</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead >Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>price</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order?.items?.map(item=>(
            <TableRow key={item?.id}>
            <TableCell className="font-medium">{item?.id}</TableCell>
            <TableCell>{item?.name}</TableCell>
            <TableCell>{item?.price}</TableCell>
            <TableCell className="text-right">${item?.quantity}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RefundsDetail;
