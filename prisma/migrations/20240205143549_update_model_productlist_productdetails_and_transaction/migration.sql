/*
  Warnings:

  - You are about to drop the column `productlist_id` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `ProductDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_productlist_id_fkey";

-- AlterTable
ALTER TABLE "ProductDetails" ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "productlist_id";

-- CreateTable
CREATE TABLE "_ProductListToTransaction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductListToTransaction_AB_unique" ON "_ProductListToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductListToTransaction_B_index" ON "_ProductListToTransaction"("B");

-- CreateIndex
CREATE UNIQUE INDEX "ProductDetails_product_id_key" ON "ProductDetails"("product_id");

-- AddForeignKey
ALTER TABLE "ProductDetails" ADD CONSTRAINT "ProductDetails_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductList"("productlist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductListToTransaction" ADD CONSTRAINT "_ProductListToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductList"("productlist_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductListToTransaction" ADD CONSTRAINT "_ProductListToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("transaction_id") ON DELETE CASCADE ON UPDATE CASCADE;
