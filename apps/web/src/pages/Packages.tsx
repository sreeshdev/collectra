import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Popover,
  Space,
} from "antd";
import { PlusOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import ResponsiveTable from "../components/ResponsiveTable";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

interface Package {
  id: string;
  name: string;
  price: number;
  recurringType: "MONTHLY" | "BIMONTHLY";
}

export default function Packages() {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const { data: packages, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const response = await api.get("/api/packages");
      return response.data.packages;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      const response = await api.post("/api/packages", values);
      return response.data;
    },
    onSuccess: () => {
      message.success("Package created successfully");
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || "Failed to create package");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...values }: any) => {
      const response = await api.put(`/api/packages/${id}`, values);
      return response.data;
    },
    onSuccess: () => {
      message.success("Package updated successfully");
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      setModalVisible(false);
      form.resetFields();
      setEditingPackage(null);
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || "Failed to update package");
    },
  });

  const handleSubmit = (values: any) => {
    if (editingPackage) {
      updateMutation.mutate({ id: editingPackage.id, ...values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleEdit = (pkg: Package) => {
    if (user?.role !== "ADMIN") return;
    setEditingPackage(pkg);
    form.setFieldsValue(pkg);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `₹${price}`,
    },
    {
      title: "Recurring Type",
      dataIndex: "recurringType",
      key: "recurringType",
    },
    ...(user?.role === "ADMIN"
      ? [
          {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Package) => {
              const actionItems = (
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <Button
                    type="text"
                    block
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(record)}
                    style={{ textAlign: "left" }}
                  >
                    Edit
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
        }}
      >
        <h1>Packages</h1>
        {user?.role === "ADMIN" && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingPackage(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            Add Package
          </Button>
        )}
      </div>

      <ResponsiveTable
        columns={columns}
        dataSource={packages}
        loading={isLoading}
        rowKey="id"
      />

      {user?.role === "ADMIN" && (
        <Modal
          title={editingPackage ? "Edit Package" : "Add Package"}
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            form.resetFields();
            setEditingPackage(null);
          }}
          onOk={() => form.submit()}
          confirmLoading={createMutation.isPending || updateMutation.isPending}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="name"
              label="Package Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price (INR)"
              rules={[{ required: true, type: "number", min: 0 }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="recurringType"
              label="Recurring Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="MONTHLY">Monthly</Select.Option>
                <Select.Option value="BIMONTHLY">Bi-Monthly</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}
