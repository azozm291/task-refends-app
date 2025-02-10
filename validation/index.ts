import { z } from "zod";

export const refundFormSchema = z.object({
    reason: z.string().min(1, 'Reason is required'),
    store_name: z.string().min(1, 'Store name is required'),
    store_logo: z.string().url('Invalid URL'),
    store_url: z.string().url('Invalid URL'),
    amount: z.number().positive('Amount must be positive'),
    items: z.array(
      z.object({
        name: z.string().min(1, 'Item name is required'),
        price: z.number().positive('Price must be positive'),
        quantity: z.number().int().positive('Quantity must be a positive integer'),
      })
    ).min(1, 'At least one item is required'),
  })
  

export type RefundType = z.infer<typeof refundFormSchema> 


export const itemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
})