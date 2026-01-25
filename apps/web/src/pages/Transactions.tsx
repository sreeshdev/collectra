import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Space, Tag, DatePicker, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import ResponsiveTable from "../components/ResponsiveTable";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import dayjs, { Dayjs } from "dayjs";
// Helper function to format text
const startCase = (str: string) => {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
}
export default function Transactions() {
  const { user } = useAuth();
  const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs().startOf('month'));
  const [toDate, setToDate] = useState<Dayjs | null>(dayjs().endOf('month'));

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions", fromDate?.format('YYYY-MM-DD'), toDate?.format('YYYY-MM-DD')],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (fromDate) params.append('fromDate', fromDate.format('YYYY-MM-DD'));
      if (toDate) params.append('toDate', toDate.format('YYYY-MM-DD'));

      const response = await api.get(`/api/transactions?${params.toString()}`);
      return response.data.transactions;
    },
    enabled: !!fromDate && !!toDate,
  });

  const handleExport = async () => {
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();
      if (fromDate) params.append('fromDate', fromDate.format('YYYY-MM-DD'));
      if (toDate) params.append('toDate', toDate.format('YYYY-MM-DD'));

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8787/"
        }api/transactions/export?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const filename = fromDate && toDate
        ? `transactions-${fromDate.format('DD-MM-YYYY')}-to-${toDate.format('DD-MM-YYYY')}.csv`
        : 'transactions.csv';
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      message.success("Export successful");
    } catch (error: any) {
      message.error(error.message || "Export failed");
    }
  };

  const columns = [
    {
      title: "Customer",
      key: "customer",
      render: (_: any, record: any) => (
        <div>
          <div>{record.customer.name}</div>
          <div style={{ fontSize: 12, color: "#999" }}>
            Box: {record.customer.boxNumber}
          </div>
        </div>
      ),
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Type",
      dataIndex: "transactionType",
      key: "transactionType",
      render: (type: string) => <Tag>{startCase(type)}</Tag>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `₹${amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "paid" ? "green" : status === "pending" ? "orange" : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Collected By",
      dataIndex: ["user", "name"],
      key: "user",
    },
  ];

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Transactions</h1>
        {user?.role === "ADMIN" && (
          <Button icon={<DownloadOutlined />} onClick={handleExport}>
            Export Excel
          </Button>
        )}
      </div>

      <Space style={{ marginBottom: 16 }}>
        <DatePicker
          placeholder="From Date"
          value={fromDate}
          onChange={setFromDate}
          style={{ width: 150 }}
          format="DD/MM/YYYY"
        />
        <DatePicker
          placeholder="To Date"
          value={toDate}
          onChange={setToDate}
          style={{ width: 150 }}
          format="DD/MM/YYYY"
        />
      </Space>

      <ResponsiveTable
        columns={columns}
        dataSource={transactions}
        loading={isLoading}
        rowKey="id"
      />
    </div>
  );
}
