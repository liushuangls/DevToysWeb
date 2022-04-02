import { CopyOutlined } from '@ant-design/icons'
import { message } from 'antd'
import React from 'react'

import { copyToClipboard } from '../../utils/browser'

interface CopyProps {
  value: string
}

const CopyToClipboard: React.FC<CopyProps> = ({ value }) => {
  const handleClick = () => {
    copyToClipboard(value).then(() => {
      message.success('复制成功')
    }).catch((e) => {
      message.error(e)
    })
  }

  return (
    <CopyOutlined onClick={handleClick} />
  )
}

export default CopyToClipboard
