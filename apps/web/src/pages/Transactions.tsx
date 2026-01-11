import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Space, Tag, Select, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import ResponsiveTable from "../components/ResponsiveTable";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import dayjs from "dayjs";
// Helper function to format text
const startCase = (str: string) => {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
}
export default function Transactions() {
  const { user } = useAuth();
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [year, setYear] = useState(dayjs().year());

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions", month, year],
    queryFn: async () => {
      const response = await api.get(
        `/api/transactions?month=${month}&year=${year}`
      );
      return response.data.transactions;
    },
    enabled: !!month && !!year,
  });

  const handleExport = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8787"
        }/api/transactions/export?month=${month}&year=${year}`,
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
      link.setAttribute("download", `transactions-${month}-${year}.csv`);
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
        <Select
          style={{ width: 150 }}
          value={month}
          onChange={setMonth}
          placeholder="Month"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <Select.Option key={m} value={m}>
              {dayjs()
                .month(m - 1)
                .format("MMMM")}
            </Select.Option>
          ))}
        </Select>
        <Select
          style={{ width: 150 }}
          value={year}
          onChange={setYear}
          placeholder="Year"
        >
          {Array.from({ length: 5 }, (_, i) => dayjs().year() - 2 + i).map(
            (y) => (
              <Select.Option key={y} value={y}>
                {y}
              </Select.Option>
            )
          )}
        </Select>
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
