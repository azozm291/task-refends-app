import { getRefund } from "@/actions/refunds.action";
import RefundsDetail from "@/components/RefundsDetail";
import ToastMessage from "@/components/ToastMessage";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface IProps{
    params:Promise<{
        id:string;
    }>
}

export const metaData:Metadata = {
    title:"refund detail page"
}

export default async function OrderDetailsPage({params}:IProps) {
    const {id} = await params;
    const order = await getRefund(id);
    if(!order?.refundOrder){
        redirect("/");
    }
    if(!order?.success){
        return <ToastMessage errorMessage={order?.message}/>
    }
  return (
    <div className="py-10 max-w-7xl mx-auto">
        <RefundsDetail order={order.refundOrder}/>
    </div>
  )
}

