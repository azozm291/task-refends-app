"use server";

import { prisma } from "@/lib/db";
import { RefundType } from "@/validation";
import { revalidatePath } from "next/cache";

export const getAllRefunds = async (currentPage: string, limit: number) => {
  const page = Number.parseInt(currentPage || "1");

  const skip = (page - 1) * limit;

  try {
    const [refundOrders, totalCount] = await Promise.all([
      prisma.refundOrder.findMany({
        skip,
        take: limit,
        include: { items: true },
      }),
      prisma.refundOrder.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    return {
      success: true,
      refundOrders,
      totalPages,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error fetching refund orders: ${
        error instanceof Error ? error.message : "Somthing went wrong"
      }`,
    };
  }
};

export const getRefund = async (id: string) => {
  try {
    const refundOrder = await prisma.refundOrder.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!refundOrder) {
      return {
        success: true,
        message:"Refund order not found" 
      }
    }
    return {
      success: true,
      refundOrder,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error fetching refund orders: ${
        error instanceof Error ? error.message : "Somthing went wrong"
      }`,
    };
  }
};



export const createRefund = async (values:RefundType) => {
    try {
        await prisma.refundOrder.create({
            data: {
              reason: values?.reason,
              store_name: values?.store_name,
              store_logo: values?.store_logo,
              store_url: values?.store_url,
              amount: values?.amount,
              items: {
                create: values?.items,
              },
            },
            include: { items: true },
          })
      return {
        success: true,
        message:"Refund Created successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: `Error fetching refund orders: ${
          error instanceof Error ? error.message : "Somthing went wrong"
        }`,
      };
    }
  };


  export const updateRefundDecision = async (id: string, decision: string) => {
    try {
      await prisma.refundOrder.update({
        where: { id },
        data: { decision },
      });
      revalidatePath('/refunds');
      return {
        success: true,
        message: `Decision updated to ${decision}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error updating decision: ${
          error instanceof Error ? error.message : "Something went wrong"
        }`,
      };
    }
  };
  
  export const updateRefundStatus = async (id: string, active: boolean) => {
    try {
      await prisma.refundOrder.update({
        where: { id },
        data: { active },
      });
      revalidatePath('/refunds');
      return {
        success: true,
        message: `Status updated to ${active ? "active" : "inactive"}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error updating status: ${
          error instanceof Error ? error.message : "Something went wrong"
        }`,
      };
    }
  };
