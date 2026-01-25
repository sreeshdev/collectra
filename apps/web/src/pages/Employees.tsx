import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Form, Input, message, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
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

export default function Employees() {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await api.get("/api/users");
      return response.data.users;
    },
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
      render: (_: any, record: Employee) => (
        <div style={{ display: "flex", gap: "8px" }}>
          {record.role === "EMPLOYEE" && (
            <Button
              icon={<EyeOutlined />}
              onClick={() => navigate(`/employees/${record.id}/view`)}
            >
              View
            </Button>
          )}
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
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
              icon={<DeleteOutlined />}
              danger
              loading={deleteMutation.isPending}
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
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
