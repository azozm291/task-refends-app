'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { refundFormSchema } from '@/validation'
import { Textarea } from './ui/textarea'
import { createRefund } from '@/actions/refunds.action'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ItemForm } from './ItemForm'


type RefundFormValues = z.infer<typeof refundFormSchema>

interface IProps{
    onSuccess?:()=>void;
}

export function RefundForm({onSuccess}:IProps) {
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false)
  const [isPending,startTransition] = useTransition();
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<RefundFormValues>({
    resolver: zodResolver(refundFormSchema),
    defaultValues: {
      reason: '',
      store_name: '',
      store_logo: '',
      store_url: '',
      amount: 0,
      items: [],
    },
  })

  async function onSubmit(data: RefundFormValues) {
    try {
        startTransition(async()=>{
            const res = await createRefund(data);
            if(!res?.success){
                toast({
                    variant:'destructive',
                    description: res?.message,
                  })
            }
            toast({
                title: 'Success',
                description: 'Refund order created successfully',
              })
              router.refresh()
              onSuccess?.()
              form.reset()
              
        })
    } catch (error) {
      console.error('Error creating refund order:', error)
      toast({
        title: 'Error',
        description: 'Failed to create refund order',
        variant: 'destructive',
      })
    }
  }
  const handleAddItem = (item: { name: string; price: number; quantity: number }) => {
    const currentItems = form.getValues("items")
    form.setValue("items", [...currentItems, item])
    setIsItemDialogOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="store_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="store_logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Logo URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="store_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h3 className="text-lg font-semibold mb-2">Items</h3>
          {form.watch("items").map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
              <span>x{item.quantity}</span>
            </div>
          ))}
          <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
              </DialogHeader>
              <ItemForm onSubmit={handleAddItem} onCancel={() => setIsItemDialogOpen(false)} />
            </DialogContent>
          </Dialog>
          </div>
        <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." :"Submit Refund Order"}
        </Button>
      </form>
    </Form>
  )
}