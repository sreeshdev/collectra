import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Popover,
  Space,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ResponsiveTable from "../components/ResponsiveTable";
import api from "../utils/api";

interface Employee {
  id: string;
  name: string;
  mobile: string;
  email: string;
  address?: string;
  displayPictureUrl?: string;
  role: string;
}

interface CustomerForEmployee {
  id: string;
  name: string;
  boxNumber: string;
  mobile: string;
  pendingBalance: number;
  package: { id: string; name: string };
}

export default function Employees() {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [customersModalEmployee, setCustomersModalEmployee] =
    useState<Employee | null>(null);
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await api.get("/api/users");
      return response.data.users;
    },
  });

  const { data: employeeCustomers, isLoading: loadingEmployeeCustomers } =
    useQuery({
      queryKey: ["employees", customersModalEmployee?.id, "customers"],
      queryFn: async () => {
        const response = await api.get(
          `/api/users/${customersModalEmployee?.id}/customers`,
        );
        return response.data.customers as CustomerForEmployee[];
      },
      enabled: !!customersModalEmployee?.id,
    });

  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      const response = await api.post("/api/users", values);
      return response.data;
    },
    onSuccess: () => {
      message.success("Employee created successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || "Failed to create employee");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...values }: any) => {
      const response = await api.put(`/api/users/${id}`, values);
      return response.data;
    },
    onSuccess: () => {
      message.success("Employee updated successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setModalVisible(false);
      form.resetFields();
      setEditingEmployee(null);
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || "Failed to update employee");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/api/users/${id}`);
      return response.data;
    },
    onSuccess: () => {
      message.success("Employee deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || "Failed to delete employee");
    },
  });

  const handleSubmit = (values: any) => {
    if (editingEmployee) {
      updateMutation.mutate({ id: editingEmployee.id, ...values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    form.setFieldsValue(employee);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Employee) => {
        const actionItems = (
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            {record.role === "EMPLOYEE" && (
              <>
                <Button
                  type="text"
                  block
                  icon={<EyeOutlined />}
                  onClick={() => navigate(`/employees/${record.id}/view`)}
                  style={{ textAlign: "left" }}
                >
                  View
                </Button>
                <Button
                  type="text"
                  block
                  icon={<TeamOutlined />}
                  onClick={() => setCustomersModalEmployee(record)}
                  style={{ textAlign: "left" }}
                >
                  View customers
                </Button>
              </>
            )}
            <Button
              type="text"
              block
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              style={{ textAlign: "left" }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete Employee"
              description="Are you sure you want to delete this employee?"
              onConfirm={() => deleteMutation.mutate(record.id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ danger: true }}
            >
              <Button
                type="text"
                block
                icon={<DeleteOutlined />}
                danger
                loading={deleteMutation.isPending}
                style={{ textAlign: "left" }}
              >
                Delete
              </Button>
            </Popconfirm>
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
        <h1>Employees</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingEmployee(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Add Employee
        </Button>
      </div>

      <ResponsiveTable
        columns={columns}
        dataSource={employees}
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title={
          customersModalEmployee
            ? `Customers linked to ${customersModalEmployee.name} (${employeeCustomers?.length})`
            : undefined
        }
        open={!!customersModalEmployee}
        onCancel={() => setCustomersModalEmployee(null)}
        footer={null}
        width={700}
      >
        {customersModalEmployee && (
          <>
            {loadingEmployeeCustomers ? (
              <div style={{ padding: 24, textAlign: "center" }}>
                Loading customers...
              </div>
            ) : !employeeCustomers?.length ? (
              <div style={{ padding: 24, textAlign: "center", color: "#888" }}>
                No customers linked to this employee.
              </div>
            ) : (
              <ResponsiveTable
                columns={[
                  { title: "Name", dataIndex: "name", key: "name" },
                  {
                    title: "Box Number",
                    dataIndex: "boxNumber",
                    key: "boxNumber",
                  },
                  { title: "Mobile", dataIndex: "mobile", key: "mobile" },
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
                    title: "Action",
                    key: "action",
                    render: (_: unknown, cust: CustomerForEmployee) => (
                      <Button
                        type="link"
                        size="small"
                        onClick={() => {
                          setCustomersModalEmployee(null);
                          navigate(`/customers/${cust.id}`);
                        }}
                      >
                        View
                      </Button>
                    ),
                  },
                ]}
                dataSource={employeeCustomers ?? []}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            )}
          </>
        )}
      </Modal>

      <Modal
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingEmployee(null);
        }}
        onOk={() => form.submit()}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
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
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input.TextArea />
          </Form.Item>
          {/* <Form.Item name="displayPictureUrl" label="Display Picture URL">
            <Input />
          </Form.Item> */}
          {!editingEmployee && (
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, min: 6 }]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
}
