import { FC, useState } from 'react'

const Find: FC = () => {

  const [num, setNum] = useState<number>(1)

  return (
    <div>
      个人中心 { num }
    </div>
  )
}

export default Find