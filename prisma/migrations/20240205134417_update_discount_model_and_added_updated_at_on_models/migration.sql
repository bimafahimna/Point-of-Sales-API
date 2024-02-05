/*
  Warnings:

  - A unique constraint covering the columns `[discount_code]` on the table `Discount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discount_code` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Made the column `updated_at` on table `ProductDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `ProductList` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Discount" ADD COLUMN     "description" TEXT,
ADD COLUMN     "discount_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductDetails" ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProductList" ALTER COLUMN "updated_at" SET NOT NULL;

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "productlist_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Discount_discount_code_key" ON "Discount"("discount_code");
