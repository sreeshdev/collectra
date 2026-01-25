import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Select, Button, Modal, message, Tag, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ResponsiveTable from "../components/ResponsiveTable";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import dayjs from "dayjs";

interface BoxNumberRequest {
  id: string;
  customer: {
    id: string;
    name: string;
    boxNumber: string;
    mobile: string;
  };
  oldBoxNumber: string;
  newBoxNumber: string;
  remarks?: string;
  status: "pending" | "approved" | "rejected";
  reviewer?: {
    name: string;
  };
  reviewedAt?: string;
  createdAt: string;
}

export default function BoxNumberRequest() {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
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
    queryKey: ["box-number-requests"],
    queryFn: async () => {
      const response = await api.get("/api/box-number-requests");
      return response.data.requests;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: { customerId: string; newBoxNumber: string; remarks?: string }) => {
      const response = await api.post("/api/box-number-requests", values);
      return response.data;
    },
    onSuccess: () => {
      message.success("Box number update request created successfully");
      queryClient.invalidateQueries({ queryKey: ["box-number-requests"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || "Failed to create request");
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.put(`/api/box-number-requests/${id}/approve`);
      return response.data;
    },
    onSuccess: () => {
      message.success("Request approved and box number updated");
      queryClient.invalidateQueries({ queryKey: ["box-number-requests"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || "Failed to approve request");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.put(`/api/box-number-requests/${id}/reject`);
      return response.data;
    },
    onSuccess: () => {
      message.success("Request rejected");
      queryClient.invalidateQueries({ queryKey: ["box-number-requests"] });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || "Failed to reject request");
    },
  });

  const handleSubmit = (values: any) => {
    createMutation.mutate(values);
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: ["customer", "name"],
      key: "customerName",
    },
    {
      title: "Current Box Number",
      dataIndex: "oldBoxNumber",
      key: "oldBoxNumber",
    },
    {
      title: "New Box Number",
      dataIndex: "newBoxNumber",
      key: "newBoxNumber",
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
            render: (date: string) => (date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "N/A"),
          },
          {
            title: "Actions",
            key: "actions",
            render: (_: any, record: BoxNumberRequest) => (
              <Space>
                {record.status === "pending" && (
                  <>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => approveMutation.mutate(record.id)}
                      loading={approveMutation.isPending}
                    >
                      Approve
                    </Button>
                    <Button
                      danger
                      size="small"
                      onClick={() => rejectMutation.mutate(record.id)}
                      loading={rejectMutation.isPending}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </Space>
            ),
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
        }}
      >
        <h1>Box Number Update Requests</h1>
        {user?.role === "EMPLOYEE" && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Create Request
          </Button>
        )}
      </div>

      <ResponsiveTable
        columns={columns}
        dataSource={requests}
        loading={isLoading}
        rowKey="id"
      />

      {user?.role === "EMPLOYEE" && (
        <Modal
          title="Create Box Number Update Request"
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
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                options={customers?.map((c: any) => ({
                  label: `${c.name} - Box: ${c.boxNumber}`,
                  value: c.id,
                }))}
              />
            </Form.Item>

            <Form.Item
              name="newBoxNumber"
              label="New Box Number"
              rules={[
                { required: true, message: "Please enter new box number" },
                { min: 1, message: "Box number cannot be empty" },
              ]}
            >
              <Input placeholder="Enter new box number" />
            </Form.Item>

            <Form.Item name="remarks" label="Remarks">
              <Input.TextArea
                rows={4}
                placeholder="Enter reason for box number change (optional)"
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
