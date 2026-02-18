-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "CustomerStatusRequestStatus" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "customers" ADD COLUMN "status" "CustomerStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "customer_status_change_requests" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "requested_by" TEXT NOT NULL,
    "requested_status" "CustomerStatus" NOT NULL,
    "remarks" TEXT,
    "status" "CustomerStatusRequestStatus" NOT NULL DEFAULT 'pending',
    "reviewed_by" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_status_change_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customer_status_change_requests" ADD CONSTRAINT "customer_status_change_requests_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_status_change_requests" ADD CONSTRAINT "customer_status_change_requests_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_status_change_requests" ADD CONSTRAINT "customer_status_change_requests_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
