import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, Descriptions, Spin, Statistic, Row, Col, Button } from "antd";
import { ArrowLeftOutlined, DollarOutlined, TransactionOutlined } from "@ant-design/icons";
import { Grid } from "antd";
import api from "../utils/api";
import dayjs from "dayjs";

const { useBreakpoint } = Grid;

interface CustomerData {
  id: string;
  name: string;
  boxNumber: string;
  mobile: string;
  whatsappMobile: string;
  email?: string;
  address?: string;
  pendingBalance: number;
  package: {
    name: string;
    price: number;
  };
  assignedEmployee?: {
    name: string;
  };
}

interface CollectionStats {
  todayCollectionCount: number;
  todayCollectionAmount: number;
  monthlyCollectionCount: number;
  monthlyCollectionAmount: number;
}

interface EmployeeCustomerViewData {
  customer: CustomerData;
  collectionStats: CollectionStats;
}

export default function EmployeeCustomerView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  const { data, isLoading } = useQuery({
    queryKey: ["employee-customer-view", id],
    queryFn: async (): Promise<EmployeeCustomerViewData> => {
      const response = await api.get(`/api/customers/${id}/employee-view`);
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
    return <div>Customer not found</div>;
  }

  const { customer, collectionStats } = data;

  return (
    <div>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/customers")}
        style={{ marginBottom: 16 }}
      >
        Back
      </Button>

      <h1>Customer Collection Details</h1>

      <Card title="Customer Information" style={{ marginBottom: 16 }}>
        <Descriptions column={isMobile ? 1 : 2} bordered>
          <Descriptions.Item label="Name">{customer.name}</Descriptions.Item>
          <Descriptions.Item label="Box Number">{customer.boxNumber}</Descriptions.Item>
          <Descriptions.Item label="Mobile">{customer.mobile}</Descriptions.Item>
          <Descriptions.Item label="WhatsApp Mobile">{customer.whatsappMobile}</Descriptions.Item>
          <Descriptions.Item label="Email">{customer.email || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Address">{customer.address || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Package">{customer.package.name}</Descriptions.Item>
          <Descriptions.Item label="Package Price">₹{customer.package.price}</Descriptions.Item>
          <Descriptions.Item label="Pending Balance">
            <strong style={{ color: "#cf1322" }}>₹{customer.pendingBalance}</strong>
          </Descriptions.Item>
          <Descriptions.Item label="Assigned Employee">
            {customer.assignedEmployee?.name || "Not Assigned"}
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

      <Card title="Summary">
        <p>
          <strong>Current Month:</strong> {dayjs().format("MMMM YYYY")}
        </p>
        <p>
          <strong>Pending Balance:</strong> ₹{customer?.pendingBalance}
        </p>
        <p>
          <strong>Monthly Collection Progress:</strong>{" "}
          {((collectionStats?.monthlyCollectionAmount / customer?.package.price) * 100)}%
          of monthly package amount
        </p>
      </Card>
    </div>
  );
}