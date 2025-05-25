/*
  Warnings:

  - Made the column `stockQuantity` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `minimumOrderQuantity` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `brand` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `condition` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "stockQuantity" SET NOT NULL,
ALTER COLUMN "minimumOrderQuantity" SET NOT NULL,
ALTER COLUMN "minimumOrderQuantity" DROP DEFAULT,
ALTER COLUMN "brand" SET NOT NULL,
ALTER COLUMN "condition" SET NOT NULL;
