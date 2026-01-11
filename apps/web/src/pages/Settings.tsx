import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Tabs, Form, Input, Button, Card, message, Upload, Space } from 'antd'
import { UserOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons'
import api from '../utils/api'
import { useAuth } from '../contexts/AuthContext'

export default function Settings() {
  const { user, refreshUser } = useAuth()
  const [profileForm] = Form.useForm()
  const [passwordForm] = Form.useForm()

  const queryClient = useQueryClient()

  const updateProfileMutation = useMutation({
    mutationFn: async (values: any) => {
      const response = await api.put('/api/users/me', values)
      return response.data
    },
    onSuccess: () => {
      message.success('Profile updated successfully')
      refreshUser()
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || 'Failed to update profile')
    },
  })

  const changePasswordMutation = useMutation({
    mutationFn: async (values: any) => {
      const response = await api.post('/auth/change-password', values)
      return response.data
    },
    onSuccess: () => {
      message.success('Password changed successfully')
      passwordForm.resetFields()
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || 'Failed to change password')
    },
  })

  const handleProfileSubmit = (values: any) => {
    updateProfileMutation.mutate(values)
  }

  const handlePasswordSubmit = (values: any) => {
    changePasswordMutation.mutate({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    })
  }

  return (
    <div>
      <h1>Settings</h1>
      <Card>
        <Tabs
          items={[
            {
              key: 'profile',
              label: 'Update Profile',
              icon: <UserOutlined />,
              children: (
                <Form
                  form={profileForm}
                  onFinish={handleProfileSubmit}
                  layout="vertical"
                  initialValues={user}
                  style={{ maxWidth: 500 }}
                >
                  <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="mobile" label="Mobile" rules={[{ required: true, len: 10 }]}>
                    <Input maxLength={10} />
                  </Form.Item>
                  <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="address" label="Address">
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item name="displayPictureUrl" label="Display Picture URL">
                    <Input placeholder="Enter image URL" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={updateProfileMutation.isPending}>
                      Update Profile
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
            {
              key: 'password',
              label: 'Change Password',
              icon: <LockOutlined />,
              children: (
                <Form
                  form={passwordForm}
                  onFinish={handlePasswordSubmit}
                  layout="vertical"
                  style={{ maxWidth: 500 }}
                >
                  <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[{ required: true }]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[{ required: true, min: 6 }]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Confirm New Password"
                    dependencies={['newPassword']}
                    rules={[
                      { required: true },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('Passwords do not match'))
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={changePasswordMutation.isPending}>
                      Change Password
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
      </Card>
    </div>
  )
}

