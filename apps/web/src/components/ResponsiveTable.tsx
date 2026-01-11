import { useState, useEffect, ReactNode } from 'react'
import { Table, TableProps } from 'antd'

interface ResponsiveTableProps<T> extends TableProps<T> {
  children?: ReactNode
}

export default function ResponsiveTable<T extends Record<string, any>>(props: ResponsiveTableProps<T>) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ 
      width: '100%',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      margin: '0 -8px',
      padding: '0 8px',
    }}>
      <Table
        {...props}
        scroll={isMobile ? { x: 'max-content' } : undefined}
        pagination={{
          ...props.pagination,
          showSizeChanger: !isMobile,
          showTotal: !isMobile ? props.pagination?.showTotal : undefined,
          simple: isMobile,
        }}
      />
    </div>
  )
}

