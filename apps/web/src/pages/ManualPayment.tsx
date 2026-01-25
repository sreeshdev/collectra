import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Input, InputNumber, Button, Card, message, AutoComplete, Space, Typography } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import api from '../utils/api'

const { Text } = Typography

export default function ManualPayment() {
  const [form] = Form.useForm()
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [searchValue, setSearchValue] = useState('')

  const queryClient = useQueryClient()

  const { data: searchResults } = useQuery({
    queryKey: ['customer-search', searchValue],
    queryFn: async () => {
      if (!searchValue) return []
      const response = await api.get(`/api/customers/search?q=${searchValue}`)
      return response.data.customers
    },
    enabled: searchValue.length >= 2,
  })

  const paymentMutation = useMutation({
    mutationFn: async (values: { customerId: string; amount: number; remarks?: string }) => {
      const response = await api.post('/api/transactions/manual', values)
      return response.data
    },
    onSuccess: () => {
      message.success('Payment collected successfully')
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      form.resetFields()
      setSelectedCustomer(null)
      setSearchValue('')
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || 'Failed to collect payment')
    },
  })

  const handleCustomerSelect = (_value: string, option: any) => {
    const customer = searchResults?.find((c: any) => c.id === option.key)
    if (customer) {
      setSelectedCustomer(customer)
      form.setFieldsValue({ customerId: customer.id })
    }
  }

  const handleSubmit = (values: any) => {
    if (!selectedCustomer) {
      message.warning('Please select a customer')
      return
    }

    const pendingBalance = Number(selectedCustomer.pendingBalance)
    if (values.amount > pendingBalance) {
      message.error(`Amount cannot exceed pending balance of ₹${pendingBalance}`)
      return
    }

    paymentMutation.mutate(values)
  }

  const amount = Form.useWatch('amount', form)
  const remainingAmount = selectedCustomer
    ? Math.max(0, Number(selectedCustomer.pendingBalance) - (amount || 0))
    : 0

  return (
    <div>
      <h1>Manual Payment Collection</h1>
      <Card style={{ maxWidth: 600 }}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Search Customer" required>
            <AutoComplete
              style={{ width: '100%' }}
              options={searchResults?.map((c: any) => ({
                key: c.id,
                value: `${c.name} - ${c.boxNumber} - ${c.mobile}${c.address ? ` - ${c.address}` : ''}`,
                label: (
                  <div>
                    <div>{c.name}</div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Box: {c.boxNumber} | Mobile: {c.mobile}
                      {c.address && ` | Address: ${c.address}`}
                    </Text>
                  </div>
                ),
              }))}
              onSearch={setSearchValue}
              onSelect={handleCustomerSelect}
              placeholder="Search by name, box number, mobile, or address"
              filterOption={false}
            />
          </Form.Item>

          {selectedCustomer && (
            <>
              <Card size="small" style={{ marginBottom: 16, background: '#f5f5f5' }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text strong>Customer:</Text> {selectedCustomer.name}
                  </div>
                  <div>
                    <Text strong>Box Number:</Text> {selectedCustomer.boxNumber}
                  </div>
                  <div>
                    <Text strong>Pending Balance:</Text>{' '}
                    <Text style={{ color: '#cf1322', fontSize: 18 }}>
                      ₹{selectedCustomer.pendingBalance}
                    </Text>
                  </div>
                </Space>
              </Card>

              <Form.Item
                name="customerId"
                hidden
              >
                <Input type="hidden" />
              </Form.Item>

              <Form.Item
                name="amount"
                label="Amount Collected"
                rules={[
                  { required: true, message: 'Please enter amount' },
                  { type: 'number', min: 0.01, message: 'Amount must be greater than 0' },
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  prefix="₹"
                  min={0}
                  max={Number(selectedCustomer.pendingBalance)}
                  step={0.01}
                  precision={2}
                />
              </Form.Item>

              {amount && amount > 0 && (
                <Card size="small" style={{ marginBottom: 16, background: '#e6f7ff' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Text strong>Amount Collected:</Text>{' '}
                      <Text style={{ fontSize: 16 }}>₹{amount}</Text>
                    </div>
                    <div>
                      <Text strong>Remaining Amount:</Text>{' '}
                      <Text style={{ fontSize: 16, color: remainingAmount > 0 ? '#cf1322' : '#3f8600' }}>
                        ₹{remainingAmount}
                      </Text>
                    </div>
                  </Space>
                </Card>
              )}

              <Form.Item name="remarks" label="Remarks">
                <Input.TextArea rows={3} placeholder="Optional remarks" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<DollarOutlined />}
                  block
                  loading={paymentMutation.isPending}
                >
                  Collect Payment
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Card>
    </div>
  )
}

