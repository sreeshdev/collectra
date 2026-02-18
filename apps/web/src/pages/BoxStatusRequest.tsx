import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Form,
  Input,
  Select,
  Button,
  Modal,
  message,
  Tag,
  Space,
  Popover,
} from "antd";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import ResponsiveTable from "../components/ResponsiveTable";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import dayjs from "dayjs";

interface StatusChangeRequest {
  id: string;
  customer: {
    id: string;
    name: string;
    boxNumber: string;
    mobile: string;
    status: string;
  };
  requestedStatus: "ACTIVE" | "INACTIVE";
  remarks?: string;
  status: "pending" | "approved" | "rejected";
  reviewer?: {
    name: string;
  };
  reviewedAt?: string;
  createdAt: string;
}

export default function BoxStatusRequest() {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();

  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await api.get("/api/customers");
      return response.data.customers;
    },
    enabled: user?.role === "EMPLOYEE",
  });

  const { data: requests, isLoading } = useQuery({
    queryKey: ["box-status-requests"],
    queryFn: async () => {
      const response = await api.get("/api/box-status-requests");
      return response.data.requests;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: {
      customerId: string;
      requestedStatus: "ACTIVE" | "INACTIVE";
      remarks?: string;
    }) => {
      const response = await api.post("/api/box-status-requests", values);
      return response.data;
    },
    onSuccess: () => {
      message.success("Status change request created successfully");
      queryClient.invalidateQueries({ queryKey: ["box-status-requests"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error: any) => {
      message.error(
        error.response?.data?.error || "Failed to create request",
      );
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.put(`/api/box-status-requests/${id}/approve`);
      return response.data;
    },
    onSuccess: () => {
      message.success("Request approved and customer status updated");
      queryClient.invalidateQueries({ queryKey: ["box-status-requests"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || "Failed to approve request");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.put(`/api/box-status-requests/${id}/reject`);
      return response.data;
    },
    onSuccess: () => {
      message.success("Request rejected");
      queryClient.invalidateQueries({ queryKey: ["box-status-requests"] });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || "Failed to reject request");
    },
  });

  const handleSubmit = (values: any) => {
    createMutation.mutate(values);
  };

  const filteredRequests = requests?.filter((r: StatusChangeRequest) => {
    if (!searchText.trim()) return true;
    const q = searchText.toLowerCase().trim();
    const name = (r.customer?.name ?? "").toLowerCase();
    const boxNumber = (r.customer?.boxNumber ?? "").toLowerCase();
    return name.includes(q) || boxNumber.includes(q);
  });

  const columns = [
    {
      title: "Customer Name",
      dataIndex: ["customer", "name"],
      key: "customerName",
    },
    {
      title: "Box Number",
      dataIndex: ["customer", "boxNumber"],
      key: "boxNumber",
    },
    {
      title: "Current Status",
      dataIndex: ["customer", "status"],
      key: "currentStatus",
      render: (status: string) => (
        <Tag color={status === "ACTIVE" ? "green" : "default"}>
          {status === "ACTIVE" ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Requested Status",
      dataIndex: "requestedStatus",
      key: "requestedStatus",
      render: (status: string) => (
        <Tag color={status === "ACTIVE" ? "green" : "default"}>
          {status === "ACTIVE" ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: (text: string) => text || "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "approved"
            ? "green"
            : status === "rejected"
              ? "red"
              : "orange";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Requested Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    ...(user?.role === "ADMIN"
      ? [
          {
            title: "Reviewed By",
            dataIndex: ["reviewer", "name"],
            key: "reviewer",
            render: (name: string) => name || "N/A",
          },
          {
            title: "Reviewed Date",
            dataIndex: "reviewedAt",
            key: "reviewedAt",
            render: (date: string) =>
              date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "N/A",
          },
          {
            title: "Actions",
            key: "actions",
            render: (_: any, record: StatusChangeRequest) => {
              if (record.status !== "pending") {
                return null;
              }
              const actionItems = (
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <Button
                    type="text"
                    block
                    onClick={() => approveMutation.mutate(record.id)}
                    loading={approveMutation.isPending}
                    style={{ textAlign: "left" }}
                  >
                    Approve
                  </Button>
                  <Button
                    type="text"
                    block
                    danger
                    onClick={() => rejectMutation.mutate(record.id)}
                    loading={rejectMutation.isPending}
                    style={{ textAlign: "left" }}
                  >
                    Reject
                  </Button>
                </Space>
              );
              return (
                <Popover
                  content={actionItems}
                  trigger="hover"
                  placement="bottomRight"
                >
                  <Button type="text" icon={<MoreOutlined />} />
                </Popover>
              );
            },
          },
        ]
      : []),
  ];

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h1 style={{ margin: 0 }}>Box Status Change Requests</h1>
        <Space wrap>
          <Input.Search
            placeholder="Search by customer name or box number"
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={setSearchText}
            style={{ width: 280 }}
          />
          {user?.role === "EMPLOYEE" && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
            >
              Create Request
            </Button>
          )}
        </Space>
      </div>

      <ResponsiveTable
        columns={columns}
        dataSource={filteredRequests ?? []}
        loading={isLoading}
        rowKey="id"
      />

      {user?.role === "EMPLOYEE" && (
        <Modal
          title="Create Box Status Change Request"
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            form.resetFields();
          }}
          footer={null}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="customerId"
              label="Customer"
              rules={[{ required: true, message: "Please select a customer" }]}
            >
              <Select
                placeholder="Select a customer"
                showSearch
                filterOption={(input, option) =>
                  (option?.label || "")
                    ?.toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={customers?.map((c: any) => ({
                  label: `${c.name} - Box: ${c.boxNumber} (${c.status === "ACTIVE" ? "Active" : "Inactive"})`,
                  value: c.id,
                }))}
              />
            </Form.Item>

            <Form.Item
              name="requestedStatus"
              label="Requested Status"
              rules={[
                { required: true, message: "Please select requested status" },
              ]}
            >
              <Select placeholder="Select status">
                <Select.Option value="ACTIVE">Active</Select.Option>
                <Select.Option value="INACTIVE">Inactive</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="remarks" label="Remarks">
              <Input.TextArea
                rows={4}
                placeholder="Enter reason for status change (optional)"
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={createMutation.isPending}
                >
                  Submit Request
                </Button>
                <Button
                  onClick={() => {
                    setModalVisible(false);
                    form.resetFields();
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}
