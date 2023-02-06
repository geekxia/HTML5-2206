import { PageHeader,
  AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
     Switch,
     Upload,
     message,
    Select, } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import CateSelect from './components/CateSelect'
import GoodUpload from './components/GoodUpload'

import { fetchGoodSubmit, fetchGoodInfo } from '@/api/good'

export default () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { id } = useParams()  // 接收动态路由参数

  const submit = (values) => {
    console.log('---values', values)
    // 先手动校验，再提交接口
    form.validateFields().then(()=>{
      let data = {...values}
      if (id) values.id = id  // 编辑
      fetchGoodSubmit(values).then(res=>{
        console.log('----提交成功', res)
        if (res.info) {
          message.success(`商品${id?'修改':'添加'}成功`, 1, ()=>navigate(-1))
        }
      })
    })
  }

  useEffect(()=>{
    if (id) {
      fetchGoodInfo(id).then(({info})=>{
        // 需要用声明式变量来接收吗？（不用）
        if (info) form.setFieldsValue(info)
      })
    }
  }, [])

  return (
    <div className="good-form">

      <PageHeader
        title={id?'修改商品':'商品新增'}
        onBack={() => navigate(-1)}
        style={{background: 'white'}}
      />

      <div className='form'>

      { /* 必填与非必填；数据类型和数据格式；校验的触发机制； 自定义表单校验； */ }
      <Form
        form={form}
        labelCol={{span: 4}}
        wrapperCol={{span: 12}}
        validateTrigger={['onBlur', 'onChange']}
        onFinish={submit}
        initialValues={{}}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="商品名称"
          validateTrigger='onBlur'
          rules={[
            { required: true, message: '商品名称是必须属性' },
            { pattern: /[\u4e00-\u9fa5]{4,6}/, message: '商品名称要求4~6个中文字符' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="desc"
          label="商品描述"
          validateTrigger='onBlur'
          rules={[
            { required: true, message: '商品描述是必须属性' },
            { min: 10, max: 30, message: '商品描述要求10~30字' }
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="cate"
          label="商品品类"
          validateTrigger='onBlur'
          rules={[
            { required: true, message: '商品品类是必须属性' }
          ]}
        >
          <CateSelect />
        </Form.Item>

        <Form.Item
          name="price"
          label="商品价格"
          validateTrigger='onBlur'
          rules={[
            { required: true, message: '商品价格是必须属性' },
            {
              validator: (rule, value) => {
                // do something
                const val = Number(value)
                if (val > 0.5) {
                  // 验证成功
                  return Promise.resolve()
                } else {
                  // 验证失败
                  return Promise.reject(new Error('商品价格不能小于0.5元'))
                }
              }
            }
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="hot"
          label="是否热销"
          valuePropName='checked'
        >
          {/* Form.Item可以帮助我们自动取值，凡是被Form.Item包裹的表单，相当于给了它一个value+onChange */}
          <Switch />
        </Form.Item>

        <Form.Item
          name="img"
          label="商品图片"
          rules={[
            { required: true, message: '商品图片是必须属性' },
          ]}
        >
          <GoodUpload />
        </Form.Item>

        <Form.Item wrapperCol={{offset: 4}}>
          <Button type="primary" htmlType="submit">
            { id ? '立即修改' : '立即添加' }
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  )
}
