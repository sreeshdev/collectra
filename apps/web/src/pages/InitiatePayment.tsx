import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Modal, message, Tag } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import ResponsiveTable from '../components/ResponsiveTable'
import api from '../utils/api'

interface Customer {
  id: string
  name: string
  boxNumber: string
  package: { name: string; price: number }
  pendingBalance: number
}

export default function InitiatePayment() {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([])
  const [confirmVisible, setConfirmVisible] = useState(false)

  const queryClient = useQueryClient()

  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await api.get('/api/customers')
      return response.data.customers
    },
  })

  const initiateMutation = useMutation({
    mutationFn: async (customerIds: string[]) => {
      const response = await api.post('/api/payments/initiate-bulk', { customerIds })
      return response.data
    },
    onSuccess: (data) => {
      const results = data.results
      const successCount = results.filter((r: any) => r.success).length
      const failCount = results.filter((r: any) => !r.success).length
      
      message.success(`${successCount} payment links created successfully`)
      if (failCount > 0) {
        message.warning(`${failCount} payments failed`)
      }
      
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      setSelectedCustomerIds([])
      setConfirmVisible(false)
    },
    onError: (error: any) => {
      message.error(error.response?.data?.error || 'Failed to initiate payments')
    },
  })

  const handleInitiate = () => {
    if (selectedCustomerIds.length === 0) {
      message.warning('Please select at least one customer')
      return
    }
    setConfirmVisible(true)
  }

  const handleConfirm = () => {
    initiateMutation.mutate(selectedCustomerIds)
  }

  const rowSelection = {
    selectedRowKeys: selectedCustomerIds,
    onSelectAll: (selected: boolean, selectedRows: Customer[]) => {
      if (selected) {
        setSelectedCustomerIds(customers?.map((c: Customer) => c.id) || [])
      } else {
        setSelectedCustomerIds([])
      }
    },
    onSelect: (record: Customer, selected: boolean) => {
      if (selected) {
        setSelectedCustomerIds([...selectedCustomerIds, record.id])
      } else {
        setSelectedCustomerIds(selectedCustomerIds.filter(id => id !== record.id))
      }
    },
    getCheckboxProps: () => ({}),
  }

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Box Number',
      dataIndex: 'boxNumber',
      key: 'boxNumber',
    },
    {
      title: 'Package',
      dataIndex: ['package', 'name'],
      key: 'package',
    },
    {
      title: 'Package Amount',
      dataIndex: ['package', 'price'],
      key: 'packagePrice',
      render: (price: number) => `₹${price}`,
    },
    {
      title: 'Pending Balance',
      dataIndex: 'pendingBalance',
      key: 'pendingBalance',
      render: (balance: number) => (
        <Tag color={balance > 0 ? 'red' : 'green'}>₹{balance}</Tag>
      ),
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h1>Initiate Payment</h1>
        <Button
          type="primary"
          icon={<DollarOutlined />}
          onClick={handleInitiate}
          disabled={selectedCustomerIds.length === 0}
          loading={initiateMutation.isPending}
        >
          Initiate Payment ({selectedCustomerIds.length})
        </Button>
      </div>

      <ResponsiveTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={customers}
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title="Confirm Payment Initiation"
        open={confirmVisible}
        onOk={handleConfirm}
        onCancel={() => setConfirmVisible(false)}
        confirmLoading={initiateMutation.isPending}
      >
        <p>Are you sure you want to initiate payment for {selectedCustomerIds.length} customer(s)?</p>
        <p>This will:</p>
        <ul>
          <li>Create Razorpay payment links</li>
          <li>Send WhatsApp reminders</li>
          <li>Create pending transactions</li>
        </ul>
      </Modal>
    </div>
  )
}

