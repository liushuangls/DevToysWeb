import { Card, Col, ColorPicker, Row, Space, theme } from 'antd'
import type { Color } from 'antd/es/color-picker'
import React, { useState } from 'react'
import CopyToClipboard from '../../components/copy'

const ColorPick: React.FC = () => {
  theme.useToken()
  const [textColor, setTextColor] = useState<string>('#1677FF')
  const [bgColor, setBGColor] = useState<string>('#FFF')

  const textColorChange = (val: Color, hex: string) => {
    setTextColor(hex)
  }

  const bgColorChange = (val: Color, hex: string) => {
    setBGColor(hex)
  }

  return (
    <Space direction='vertical' style={{ margin: '20px' }}>
      <Row>
        <Card style={{ backgroundColor: bgColor, width: '60vw', textAlign: 'center' }}>
          <p style={{ fontSize: '24px', color: textColor }}>title</p>
          <p style={{ fontSize: '18px', color: textColor }}>content content</p>
        </Card>
      </Row>
      <Row>
        <Col span={12}>
          <p>Text Color</p>
          <ColorPicker value={textColor} onChange={textColorChange} trigger='hover' />
          <p>HEX: {textColor} <CopyToClipboard value={textColor} /></p>
        </Col>
        <Col span={12}>
          <p>Background Color</p>
          <ColorPicker value={bgColor} onChange={bgColorChange} trigger='hover' />
          <p>HEX: {bgColor} <CopyToClipboard value={bgColor} /></p>
        </Col>
      </Row>
    </Space>
  )
}

export default ColorPick
