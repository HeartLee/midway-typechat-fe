import { Space, Button, Form, Input, Drawer } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { buyCoffee } from '../../service'

const BuyCoffee = () => {
  const [open, setOpen] = useState(false)
  const onClose = useCallback(() => {
    setOpen(false)
  }, [])
  const { mutate } = useMutation({
    mutationKey: ['byCoffee'],
    mutationFn: buyCoffee,
    onSuccess: async (data) => {
      console.log('success', data)
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
        买咖啡
      </Button>
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

export { BuyCoffee }
