import { useQuery } from '@tanstack/react-query'
import { Card, Row, Col, Statistic, Spin } from 'antd'
import { DollarOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons'
import api from '../utils/api'
import { useAuth } from '../contexts/AuthContext'
import dayjs from 'dayjs'

export default function Dashboard() {
  const { user } = useAuth()
  const currentMonth = dayjs().month() + 1
  const currentYear = dayjs().year()

  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['transactions', currentMonth, currentYear],
    queryFn: async () => {
      const response = await api.get(`/api/transactions?month=${currentMonth}&year=${currentYear}`)
      return response.data.transactions
    },
  })

  const { data: customers, isLoading: customersLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await api.get('/api/customers')
      return response.data.customers
    },
  })

  if (transactionsLoading || customersLoading) {
    return <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: '50px' }} />
  }

  const totalCollection = transactions
    ?.filter((t: any) => t.status === 'paid')
    .reduce((sum: number, t: any) => sum + Number(t.amount), 0) || 0

  const totalPending = customers?.reduce((sum: number, c: any) => sum + Number(c.pendingBalance), 0) || 0

  const customerCount = user?.role === 'ADMIN' 
    ? customers?.length || 0
    : customers?.filter((c: any) => c.assignedEmployeeId === user?.id).length || 0

  const employeeCollection = user?.role === 'EMPLOYEE'
    ? (transactions
        ?.filter((t: any) => t.status === 'paid' && t.user.id === user.id)
        .reduce((sum: number, t: any) => sum + Number(t.amount), 0) || 0)
    : 0

  const employeePending = user?.role === 'EMPLOYEE'
    ? (customers
        ?.filter((c: any) => c.assignedEmployeeId === user.id)
        .reduce((sum: number, c: any) => sum + Number(c.pendingBalance), 0) || 0)
    : 0

  return (
    <div>
      <h1>Dashboard</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title={user?.role === 'ADMIN' ? 'Total Collection' : 'My Collection'}
              value={user?.role === 'ADMIN' ? totalCollection : employeeCollection}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix="₹"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title={user?.role === 'ADMIN' ? 'Total Pending' : 'My Pending'}
              value={user?.role === 'ADMIN' ? totalPending : employeePending}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
              suffix="₹"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Customers"
              value={customerCount}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

