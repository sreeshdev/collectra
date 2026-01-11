import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Space,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ResponsiveTable from "../components/ResponsiveTable";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import type { UploadFile } from "antd";

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

  const handleExport = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8787"
        }/api/customers/export`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `customers-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      message.success("Customers exported successfully");
    } catch (error: any) {
      message.error(error.message || "Failed to export customers");
    }
  };

  const importMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await api.post("/api/customers/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.errors && data.errors.length > 0) {
        const errorMessages = data.errors
          .map((e: any) => `Row ${e.row}: ${e.error}`)
          .join("\n");
        message.error(`Import completed with errors:\n${errorMessages}`, 10);
      } else {
        message.success(
          `Successfully imported ${
            data.imported || data.customers?.length || 0
          } customers`
        );
      }
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: any) => {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = errors
          .map((e: any) => `Row ${e.row}: ${e.error}`)
          .join("\n");
        message.error(`Import failed:\n${errorMessages}`, 10);
      } else {
        message.error(
          error.response?.data?.error || "Failed to import customers"
        );
      }
    },
  });

  const handleImport = (file: File) => {
    importMutation.mutate(file);
    return false; // Prevent default upload
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
        <Space wrap>
          <Input.Search
            placeholder="Search by name, box number, or mobile"
            style={{ width: 300 }}
            onSearch={setSearchText}
            allowClear
          />
          {user?.role === "ADMIN" && (
            <>
              <Button icon={<DownloadOutlined />} onClick={handleExport}>
                Export CSV
              </Button>
              <Upload
                accept=".csv"
                beforeUpload={handleImport}
                showUploadList={false}
                maxCount={1}
              >
                <Button
                  icon={<UploadOutlined />}
                  loading={importMutation.isPending}
                >
                  Import CSV
                </Button>
              </Upload>
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
            </>
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
