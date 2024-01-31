/*
  Warnings:

  - The primary key for the `Inventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_id` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `discount_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToTransaction` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productdetails_id]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handphone` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventory_id` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productdetails_id` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productlist_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_discount_id_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTransaction" DROP CONSTRAINT "_ProductToTransaction_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTransaction" DROP CONSTRAINT "_ProductToTransaction_B_fkey";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "date_of_birth" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "handphone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_pkey",
DROP COLUMN "product_id",
ADD COLUMN     "inventory_id" INTEGER NOT NULL,
ADD COLUMN     "productdetails_id" INTEGER NOT NULL,
ADD CONSTRAINT "Inventory_pkey" PRIMARY KEY ("inventory_id");

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "customer_id",
DROP COLUMN "discount_id",
ADD COLUMN     "productlist_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "_ProductToTransaction";

-- CreateTable
CREATE TABLE "ProductList" (
    "productlist_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "ProductList_pkey" PRIMARY KEY ("productlist_id")
);

-- CreateTable
CREATE TABLE "ProductDetails" (
    "productdetails_id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "ProductDetails_pkey" PRIMARY KEY ("productdetails_id")
);

-- CreateTable
CREATE TABLE "_DiscountToTransaction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DiscountToTransaction_AB_unique" ON "_DiscountToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscountToTransaction_B_index" ON "_DiscountToTransaction"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productdetails_id_key" ON "Inventory"("productdetails_id");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_productlist_id_fkey" FOREIGN KEY ("productlist_id") REFERENCES "ProductList"("productlist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productdetails_id_fkey" FOREIGN KEY ("productdetails_id") REFERENCES "ProductDetails"("productdetails_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscountToTransaction" ADD CONSTRAINT "_DiscountToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Discount"("discount_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscountToTransaction" ADD CONSTRAINT "_DiscountToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("transaction_id") ON DELETE CASCADE ON UPDATE CASCADE;
