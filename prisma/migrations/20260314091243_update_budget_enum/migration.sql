/*
  Warnings:

  - The values [tokens,cost] on the enum `BudgetType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BudgetType_new" AS ENUM ('TOKENS', 'COST');
ALTER TABLE "budgets" ALTER COLUMN "type" TYPE "BudgetType_new" USING ("type"::text::"BudgetType_new");
ALTER TYPE "BudgetType" RENAME TO "BudgetType_old";
ALTER TYPE "BudgetType_new" RENAME TO "BudgetType";
DROP TYPE "public"."BudgetType_old";
COMMIT;
