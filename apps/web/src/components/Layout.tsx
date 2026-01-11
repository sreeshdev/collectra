import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout as AntLayout, Menu, Avatar, Dropdown, Space } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  DropboxOutlined,
  CustomerServiceOutlined,
  DollarOutlined,
  TransactionOutlined,
  SettingOutlined,
  LogoutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";
import type { MenuProps } from "antd";

const { Header, Sider, Content } = AntLayout;

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems: MenuProps["items"] = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    ...(user?.role === "ADMIN"
      ? [
          {
            key: "/employees",
            icon: <TeamOutlined />,
            label: "Employees",
          },
        ]
      : []),
    {
      key: "/packages",
      icon: <DropboxOutlined />,
      label: "Packages",
    },
    {
      key: "/customers",
      icon: <CustomerServiceOutlined />,
      label: "Customers",
    },
    ...(user?.role === "ADMIN"
      ? [
          {
            key: "/initiate-payment",
            icon: <DollarOutlined />,
            label: "Initiate Payment",
          },
        ]
      : []),
    {
      key: "/manual-payment",
      icon: <DollarOutlined />,
      label: "Manual Payment",
    },
    {
      key: "/transactions",
      icon: <TransactionOutlined />,
      label: "Transactions",
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  const userMenuItems: MenuProps["items"] = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      logout();
    } else {
      navigate(key);
    }
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth={isMobile ? 0 : 80}
        style={{
          minHeight: "100vh",
          position: isMobile ? "fixed" : "relative",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            padding: "16px",
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {collapsed ? "DH" : "Dish Hobby"}
        </div>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <AntLayout>
        <Header
          style={{
            background: "#fff",
            padding: isMobile ? "0 16px" : "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: isMobile ? "16px" : "20px" }}>
            {isMobile ? "Payment System" : "Payment Collection System"}
          </h2>
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: handleMenuClick,
            }}
            placement="bottomRight"
          >
            <Space style={{ cursor: "pointer" }}>
              <Avatar icon={<UserOutlined />} src={user?.displayPictureUrl} />
              {!isMobile && <span>{user?.name}</span>}
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: isMobile ? "16px 8px" : "24px",
            padding: isMobile ? "16px" : "24px",
            background: "#fff",
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
}
