import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Card, Descriptions, Button, Spin, Tag } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import ResponsiveTable from '../components/ResponsiveTable'
import api from '../utils/api'
import dayjs from 'dayjs'

export default function CustomerDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      const response = await api.get(`/api/customers/${id}`)
      return response.data.customer
    },
  })

  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['customer-transactions', id],
    queryFn: async () => {
      const response = await api.get(`/api/customers/${id}/transactions`)
      return response.data.transactions
    },
  })

  if (isLoading) {
    return <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: '50px' }} />
  }

  const transactionColumns = [
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
    },
    {
      title: 'Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
      render: (type: string) => <Tag>{type}</Tag>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `₹${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'paid' ? 'green' : status === 'pending' ? 'orange' : 'red'
        return <Tag color={color}>{status.toUpperCase()}</Tag>
      },
    },
    {
      title: 'Collected By',
      dataIndex: ['user', 'name'],
      key: 'user',
    },
  ]

  return (
    <div>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/customers')} style={{ marginBottom: 16 }}>
        Back
      </Button>
      <Card title="Customer Details" style={{ marginBottom: 16 }}>
        <Descriptions column={isMobile ? 1 : 2}>
          <Descriptions.Item label="Name">{customer?.name}</Descriptions.Item>
          <Descriptions.Item label="Box Number">{customer?.boxNumber}</Descriptions.Item>
          <Descriptions.Item label="Mobile">{customer?.mobile}</Descriptions.Item>
          <Descriptions.Item label="WhatsApp Mobile">{customer?.whatsappMobile}</Descriptions.Item>
          <Descriptions.Item label="Email">{customer?.email || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Address">{customer?.address || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Package">{customer?.package?.name}</Descriptions.Item>
          <Descriptions.Item label="Package Price">₹{customer?.package?.price}</Descriptions.Item>
          <Descriptions.Item label="Pending Balance">
            <strong style={{ color: '#cf1322' }}>₹{customer?.pendingBalance}</strong>
          </Descriptions.Item>
          <Descriptions.Item label="Assigned Employee">
            {customer?.assignedEmployee?.name || 'Not Assigned'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Transaction History">
        <ResponsiveTable
          columns={transactionColumns}
          dataSource={transactions}
          loading={transactionsLoading}
          rowKey="id"
        />
      </Card>
    </div>
  )
}

