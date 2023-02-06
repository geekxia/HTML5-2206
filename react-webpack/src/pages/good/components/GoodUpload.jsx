import { Upload, Image, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useState, useEffect } from 'react'

// value + onChange 是 Form.Item 组件给的，用于表单自动取值
export default ({ value, onChange }) => {
  const [fileList, setFileList] = useState([])  // 在编辑时给Upload加默认值

  // 使用Form.Item传递过来的value渲染Upload
  useEffect(()=>{
    if (value && fileList.length===0) {
      setFileList([
        { uid: Date.now(), thumbUrl: `http://localhost:9999${value}`}
      ])
    }
  }, [value])

  const imgSuccess = ({file, fileList}) => {
    setFileList([...fileList])  // 解决“Upload受控后onChange只执行一次”的问题
    if (file.status === 'done' && file.response.err === 0) {
      const img = file.response.data.img
      console.log('上传成功---img', img)
      onChange(img) // 回传图片路径给Form.Item
    }
  }

  // 图片上传前的校验
  const imgCheck = file => {
    const arr = ['image/png', 'image/jpg']
    if (!arr.includes(file.type)) {
      message.error('图片只能是 png / jpg 格式')
      return Promise.reject()
    }
    // 图片不能大于2M
    if (file.size/1024/1024 > 2) {
      message.error('图片不能大于 2M')
      return Promise.reject()
    }
    return Promise.resolve(file) // 一定要传入file
  }

  return (
    <ImgCrop rotate>
      {/*itemRender={(_, file)=>(<Image src={file.url} />)*/}
      <Upload
        action="http://localhost:8080/api/v1/react/upload/img"
        name='good'
        headers={{ Authorization: localStorage.getItem('token') }}
        listType="picture-card"
        fileList={fileList}
        maxCount={1}
        onChange={imgSuccess}
        beforeUpload={imgCheck}
      >
        { fileList.length === 0 && '+Upload' }
      </Upload>
    </ImgCrop>
  )
}
