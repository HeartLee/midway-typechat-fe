import { Table, Space, Button, Form, Input, Drawer } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { addStar, getStateList } from '../../service'
import { type Star } from '../../types'

interface DataType {
  who: string
  to: string
  content: string
  origin_text: string
}

const columns: ColumnsType<DataType> = [
  {
    title: '提出人',
    dataIndex: 'who',
    key: 'who',
  },
  {
    title: '感谢人',
    dataIndex: 'to',
    key: 'to',
  },
  {
    title: 'STAR内容',
    dataIndex: 'content',
    key: 'content',
    render: (text: string) => {
      const star = JSON.parse(text) as Star
      const { action, task, result, situation } = star
      return (
        <div>
          <Space direction={'vertical'}>
            <div>情景：{situation}</div>
            <div>任务：{task}</div>
            <div>行动：{action}</div>
            <div>结果：{result}</div>
          </Space>
        </div>
      )
    },
  },
  {
    title: '原始内容',
    dataIndex: 'origin_text',
    key: 'origin_text',
  },
]
const StarList = () => {
  const [open, setOpen] = useState(false)
  const onClose = useCallback(() => {
    setOpen(false)
  }, [])
  const { data = [], refetch } = useQuery({
    queryKey: ['starList'],
    queryFn: getStateList,
    // options: {
    //   staleTime: 1000 * 60 * 60 * 2,
    // },
  })
  const { mutate } = useMutation({
    mutationKey: ['addStar'],
    mutationFn: addStar,
    onSuccess: async () => {
      await refetch()
      setOpen(false)
    },
  })
  const handleSubmit = useCallback(
    (values: { text: string }) => {
      mutate(values?.text)
    },
    [mutate],
  )
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true)
        }}
      >
        添加夸人STAR
      </Button>
      <Table columns={columns} dataSource={data ?? []} pagination={false} />;
      <Drawer
        title="添加夸人STAR"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Form onFinish={handleSubmit}>
          <Form.Item name={'text'} label="描述对别人的夸奖">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export { StarList }
