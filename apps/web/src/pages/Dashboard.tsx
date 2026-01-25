import { useQuery } from "@tanstack/react-query";
import { Card, Row, Col, Statistic, Spin } from "antd";
import {
  DollarOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await api.get("/api/dashboard");
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

  if (user?.role === "EMPLOYEE") {
    // Employee Dashboard
    return (
      <div>
        <h1>Dashboard</h1>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Today's Manual Collections"
                value={dashboardData?.todayManualCount || 0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Today's Online Collections"
                value={dashboardData?.todayOnlineCount || 0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: "#52c41a" }}
              />
              <div style={{ marginTop: 8, fontSize: 14, color: "#666" }}>
                Amount: ₹
                {dashboardData?.todayOnlineAmount?.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || "0.00"}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Pending Customers"
                value={dashboardData?.pendingCustomersCount || 0}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: "#faad14" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Today's Manual Collection Amount"
                value={dashboardData?.todayManualAmount || 0}
                prefix={<DollarOutlined />}
                valueStyle={{ color: "#3f8600" }}
                suffix="₹"
                precision={2}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div>
      <h1>Dashboard</h1>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Customers"
              value={dashboardData?.totalCustomers || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Today's Manual Collections"
              value={dashboardData?.todayManualCount || 0}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
            <div style={{ marginTop: 8, fontSize: 14, color: "#666" }}>
              Amount: ₹
              {dashboardData?.todayManualAmount?.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "0.00"}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Today's Online Collections"
              value={dashboardData?.todayOnlineCount || 0}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
            <div style={{ marginTop: 8, fontSize: 14, color: "#666" }}>
              Amount: ₹
              {dashboardData?.todayOnlineAmount?.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "0.00"}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Today's Collection"
              value={
                (dashboardData?.todayManualAmount || 0) +
                (dashboardData?.todayOnlineAmount || 0)
              }
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#3f8600" }}
              suffix="₹"
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Monthly Collection Count"
              value={dashboardData?.monthlyCollectionCount || 0}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Monthly Collection Amount"
              value={dashboardData?.monthlyCollectionAmount || 0}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#faad14" }}
              suffix="₹"
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title="Monthly Collection Comparison (Manual vs Online)">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={dashboardData?.monthlyData || []}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip
                  formatter={(value: number) =>
                    `₹${value.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  }
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="manual"
                  stroke="#1890ff"
                  strokeWidth={2}
                  name="Manual Collection"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="online"
                  stroke="#52c41a"
                  strokeWidth={2}
                  name="Online Collection"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
