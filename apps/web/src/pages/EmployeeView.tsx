import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, Descriptions, Spin, Statistic, Row, Col, Button } from "antd";
import { ArrowLeftOutlined, DollarOutlined, TransactionOutlined } from "@ant-design/icons";
import { Grid } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../utils/api";
import dayjs from "dayjs";

const { useBreakpoint } = Grid;

interface EmployeeData {
  id: string;
  name: string;
  mobile: string;
  email: string;
  address?: string;
  displayPictureUrl?: string;
  role: string;
  createdAt: string;
}

interface CollectionStats {
  todayCollectionCount: number;
  todayCollectionAmount: number;
  monthlyCollectionCount: number;
  monthlyCollectionAmount: number;
}

interface MonthlyData {
  month: string;
  count: number;
  amount: number;
}

interface EmployeeViewData {
  employee: EmployeeData;
  collectionStats: CollectionStats;
  monthlyData?: MonthlyData[];
}

export default function EmployeeView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  const { data, isLoading } = useQuery({
    queryKey: ["employee-view", id],
    queryFn: async (): Promise<EmployeeViewData> => {
      const response = await api.get(`/api/users/${id}/employee-stats`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <Spin
        size="large"
        style={{ display: "block", textAlign: "center", marginTop: "50px" }}
      />
    );
  }

  if (!data) {
    return <div>Employee not found</div>;
  }

  const { employee, collectionStats } = data;

  return (
    <div>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/employees")}
        style={{ marginBottom: 16 }}
      >
        Back
      </Button>

      <h1>Employee Collection Details</h1>

      <Card title="Employee Information" style={{ marginBottom: 16 }}>
        <Descriptions column={isMobile ? 1 : 2} bordered>
          <Descriptions.Item label="Name">{employee.name}</Descriptions.Item>
          <Descriptions.Item label="Mobile">{employee.mobile}</Descriptions.Item>
          <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
          <Descriptions.Item label="Address">{employee.address || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Role">{employee.role}</Descriptions.Item>
          <Descriptions.Item label="Joined Date">
            {dayjs(employee.createdAt).format("DD/MM/YYYY")}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <h2>Collection Statistics</h2>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Today's Collections"
              value={collectionStats.todayCollectionCount}
              prefix={<TransactionOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Today's Amount"
              value={collectionStats.todayCollectionAmount}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#52c41a" }}
              precision={2}
              suffix="₹"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Monthly Collections"
              value={collectionStats.monthlyCollectionCount}
              prefix={<TransactionOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Monthly Amount"
              value={collectionStats.monthlyCollectionAmount}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#faad14" }}
              precision={2}
              suffix="₹"
            />
          </Card>
        </Col>
      </Row>

      {data.monthlyData && data.monthlyData.length > 0 && (
        <Card title="Monthly Collection Comparison" style={{ marginBottom: 16 }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data.monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis yAxisId="left" orientation="left" label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Amount (₹)', angle: 90, position: 'insideRight' }} />
              <Tooltip
                formatter={(value: number, name: string) => {
                  if (name === "count") {
                    return [`${value} transactions`, "Count"];
                  }
                  return [
                    `₹${value.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`,
                    "Amount",
                  ];
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="count"
                fill="#1890ff"
                name="Collection Count"
              />
              <Bar
                yAxisId="right"
                dataKey="amount"
                fill="#52c41a"
                name="Collection Amount (₹)"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      <Card title="Summary">
        <p>
          <strong>Current Month:</strong> {dayjs().format("MMMM YYYY")}
        </p>
        <p>
          <strong>Employee:</strong> {employee.name}
        </p>
        <p>
          <strong>Total Collections Today:</strong> {collectionStats.todayCollectionCount} transactions
        </p>
        <p>
          <strong>Total Collections This Month:</strong> {collectionStats.monthlyCollectionCount} transactions
        </p>
      </Card>
    </div>
  );
}