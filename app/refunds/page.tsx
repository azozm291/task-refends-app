
import { getAllRefunds } from "@/actions/refunds.action"
import RefundsContainer from "@/components/RefundsContainer"
import ToastMessage from "@/components/ToastMessage";



interface IProps{
    searchParams:Promise<{
        page?:string;
    }>
}

export default async function RefundsPage({searchParams}:IProps) {
    const {page} = await searchParams;
    const currentPage = page || "1"
    const limit = Number(process.env.ITEM_PER_PAGE) || 15;
    const data = await getAllRefunds(currentPage,limit) 
    if(!data?.success){
        return <ToastMessage errorMessage={data?.message}/>
    }
  return (
    <div className="px-2">
      {data?.refundOrders && <RefundsContainer refundOrders={data.refundOrders}/>}
    </div>
  )
}

