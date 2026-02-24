-- CreateIndex
CREATE INDEX "box_number_requests_customer_id_idx" ON "box_number_requests"("customer_id");

-- CreateIndex
CREATE INDEX "box_number_requests_requested_by_idx" ON "box_number_requests"("requested_by");

-- CreateIndex
CREATE INDEX "box_number_requests_status_idx" ON "box_number_requests"("status");

-- CreateIndex
CREATE INDEX "box_number_requests_reviewed_by_idx" ON "box_number_requests"("reviewed_by");

-- CreateIndex
CREATE INDEX "box_number_requests_status_created_at_idx" ON "box_number_requests"("status", "created_at");

-- CreateIndex
CREATE INDEX "box_number_requests_created_at_idx" ON "box_number_requests"("created_at");

-- CreateIndex
CREATE INDEX "customer_status_change_requests_customer_id_idx" ON "customer_status_change_requests"("customer_id");

-- CreateIndex
CREATE INDEX "customer_status_change_requests_requested_by_idx" ON "customer_status_change_requests"("requested_by");

-- CreateIndex
CREATE INDEX "customer_status_change_requests_status_idx" ON "customer_status_change_requests"("status");

-- CreateIndex
CREATE INDEX "customer_status_change_requests_reviewed_by_idx" ON "customer_status_change_requests"("reviewed_by");

-- CreateIndex
CREATE INDEX "customer_status_change_requests_status_created_at_idx" ON "customer_status_change_requests"("status", "created_at");

-- CreateIndex
CREATE INDEX "customer_status_change_requests_created_at_idx" ON "customer_status_change_requests"("created_at");

-- CreateIndex
CREATE INDEX "customers_package_id_idx" ON "customers"("package_id");

-- CreateIndex
CREATE INDEX "customers_assigned_employee_id_idx" ON "customers"("assigned_employee_id");

-- CreateIndex
CREATE INDEX "customers_status_idx" ON "customers"("status");

-- CreateIndex
CREATE INDEX "customers_assigned_employee_id_status_idx" ON "customers"("assigned_employee_id", "status");

-- CreateIndex
CREATE INDEX "customers_status_pending_balance_idx" ON "customers"("status", "pending_balance");

-- CreateIndex
CREATE INDEX "customers_created_at_idx" ON "customers"("created_at");

-- CreateIndex
CREATE INDEX "packages_created_at_idx" ON "packages"("created_at");

-- CreateIndex
CREATE INDEX "payment_links_customer_id_idx" ON "payment_links"("customer_id");

-- CreateIndex
CREATE INDEX "payment_links_razorpay_link_id_idx" ON "payment_links"("razorpay_link_id");

-- CreateIndex
CREATE INDEX "payment_links_status_idx" ON "payment_links"("status");

-- CreateIndex
CREATE INDEX "transactions_customer_id_idx" ON "transactions"("customer_id");

-- CreateIndex
CREATE INDEX "transactions_transaction_by_idx" ON "transactions"("transaction_by");

-- CreateIndex
CREATE INDEX "transactions_transaction_date_idx" ON "transactions"("transaction_date");

-- CreateIndex
CREATE INDEX "transactions_status_idx" ON "transactions"("status");

-- CreateIndex
CREATE INDEX "transactions_transaction_type_idx" ON "transactions"("transaction_type");

-- CreateIndex
CREATE INDEX "transactions_customer_id_transaction_date_idx" ON "transactions"("customer_id", "transaction_date");

-- CreateIndex
CREATE INDEX "transactions_transaction_date_status_transaction_type_idx" ON "transactions"("transaction_date", "status", "transaction_type");

-- CreateIndex
CREATE INDEX "transactions_created_at_idx" ON "transactions"("created_at");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");
