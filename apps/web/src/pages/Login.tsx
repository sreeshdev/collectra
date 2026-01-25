import { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = async (values: { mobile: string; password: string }) => {
    setLoading(true);
    try {
      await login(values.mobile, values.password);
    } catch (error) {
      // Error handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
        gap: "40px",
      }}
    >
      <img
        src="/pwa-192x192.png"
        alt="Dish Hobby Logo"
        width={100}
        height={100}
        style={{ display: "block" }}
      />
      <Card
        title="Dish Hobby Cable Visons"
        style={{
          width: 400,
          textAlign: "center",
        }}
        styles={{
          header: {
            fontWeight: "bold",
            fontSize: "22px",
          },
        }}
      >
        <Form name="login" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: "Please input your mobile number!" },
              { len: 10, message: "Mobile number must be 10 digits" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Mobile Number"
              maxLength={10}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
