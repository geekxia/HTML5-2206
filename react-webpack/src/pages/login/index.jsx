import { Button, Checkbox, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import './style.scss'

import { login } from '@/store/actions'

export default () => {

  // Redux默认只能这样：dispatch({type,payload})

  const dispatch = useDispatch()

  // 登录提交
  const submit = (values) => {
    const fn = login(values)

    dispatch(fn)
  }

  return (
    <div className='login'>
      <div className='layer'>
        <div className='wrap'>
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              remember: true,
            }}
            onFinish={submit}
            autoComplete="off"
            validateTrigger={['onBlur']}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: '用户名是必填字段' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密 码"
              name="password"
              rules={[
                { required: true, message: '密码是必填字段' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 5,
                span: 16,
              }}
            >
              <Checkbox>记住用户名</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 5,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
