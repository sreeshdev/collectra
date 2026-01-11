import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Form, Input, Select, message, Space } from "antd";
import { PlusOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ResponsiveTable from "../components/ResponsiveTable";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

interface Customer {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  boxNumber: string;
  pendingBalance: number;
  package: { id: string; name: string };
}

export default function Customers() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  const queryClient = useQueryClient();

  const { data: customers, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await api.get("/api/customers");
      return response.data.customers;
    },
  });

  const { data: packages } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const response = await api.get("/api/packages");
      return response.data.packages;
    },
  });

  const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await api.get("/api/users");
      return response.data.users.filter((u: any) => u.role === "EMPLOYEE");
    },
    enabled: user?.role === "ADMIN",
  });

  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      const response = await api.post("/api/customers", values);
      return response.data;
    },
    onSuccess: () => {
      message.success("Customer created successfully");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || "Failed to create customer");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...values }: any) => {
      const response = await api.put(`/api/customers/${id}`, values);
      return response.data;
    },
    onSuccess: () => {
      message.success("Customer updated successfully");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setModalVisible(false);
      form.resetFields();
      setEditingCustomer(null);
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || "Failed to update customer");
    },
  });

  const handleSubmit = (values: any) => {
    if (editingCustomer) {
      updateMutation.mutate({ id: editingCustomer.id, ...values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleEdit = (customer: Customer) => {
    if (user?.role !== "ADMIN") return;
    setEditingCustomer(customer);
    form.setFieldsValue(customer);
    setModalVisible(true);
  };

  const filteredCustomers = customers?.filter((c: Customer) => {
    if (!searchText) return true;
    const search = searchText.toLowerCase();
    return (
      c.name.toLowerCase().includes(search) ||
      c.boxNumber.toLowerCase().includes(search) ||
      c.mobile.includes(search)
    );
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Box Number",
      dataIndex: "boxNumber",
      key: "boxNumber",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Package",
      dataIndex: ["package", "name"],
      key: "package",
    },
    {
      title: "Pending Balance",
      dataIndex: "pendingBalance",
      key: "pendingBalance",
      render: (balance: number) => `₹${balance}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Customer) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/customers/${record.id}`)}
          >
            View
          </Button>
          {user?.role === "ADMIN" && (
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
              Edit
            </Button>
          )}
        </Space>
      ),
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
        <h1>Customers</h1>
        <Space>
          <Input.Search
            placeholder="Search by name, box number, or mobile"
            style={{ width: 300 }}
            onSearch={setSearchText}
            allowClear
          />
          {user?.role === "ADMIN" && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingCustomer(null);
                form.resetFields();
                setModalVisible(true);
              }}
            >
              Add Customer
            </Button>
          )}
        </Space>
      </div>

      <ResponsiveTable
        columns={columns}
        dataSource={filteredCustomers}
        loading={isLoading}
        rowKey="id"
      />

      {user?.role === "ADMIN" && (
        <Modal
          title={editingCustomer ? "Edit Customer" : "Add Customer"}
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            form.resetFields();
            setEditingCustomer(null);
          }}
          onOk={() => form.submit()}
          confirmLoading={createMutation.isPending || updateMutation.isPending}
          width={600}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="mobile"
              label="Mobile"
              rules={[{ required: true, len: 10 }]}
            >
              <Input maxLength={10} />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="whatsappMobile"
              label="WhatsApp Mobile"
              rules={[{ required: true, len: 10 }]}
            >
              <Input maxLength={10} />
            </Form.Item>
            <Form.Item
              name="boxNumber"
              label="Box Number"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="idNumber" label="ID Number">
              <Input />
            </Form.Item>
            <Form.Item
              name="packageId"
              label="Package"
              rules={[{ required: true }]}
            >
              <Select>
                {packages?.map((pkg: any) => (
                  <Select.Option key={pkg.id} value={pkg.id}>
                    {pkg.name} - ₹{pkg.price}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="assignedEmployeeId" label="Assigned Employee">
              <Select allowClear>
                {employees?.map((emp: any) => (
                  <Select.Option key={emp.id} value={emp.id}>
                    {emp.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}
