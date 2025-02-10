-- CreateTable
CREATE TABLE "RefundOrder" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "store_logo" TEXT NOT NULL,
    "store_url" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "decision" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefundOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefundItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefundItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RefundItem" ADD CONSTRAINT "RefundItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "RefundOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
