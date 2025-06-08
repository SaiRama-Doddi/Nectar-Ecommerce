/*
  Warnings:

  - A unique constraint covering the columns `[title,category,brand]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Product_title_category_brand_key" ON "Product"("title", "category", "brand");
