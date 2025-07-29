/*
  Warnings:

  - A unique constraint covering the columns `[carNumber]` on the table `Bus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bus_carNumber_key" ON "Bus"("carNumber");
