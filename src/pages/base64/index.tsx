import { Col, Input, Row } from 'antd'
import { memo, useState } from 'react'
import CopyToClipboard from '../../components/copy'
import { b64EncodeUnicode, UnicodeDecodeB64 } from '../../utils/browser'

function Base64 () {
  const [raw, setRaw] = useState('')
  const [encoded, setEncoded] = useState('')

  const handleRawChange = (e: any) => {
    setRaw(e.target.value)
    setEncoded(b64EncodeUnicode(e.target.value))
  }

  const handleEncodedChange = (e: any) => {
    setEncoded(e.target.value)
    try {
      setRaw(UnicodeDecodeB64(e.target.value))
    } catch (e: any) {
      setRaw(e)
    }
  }

  return (
    <div className="page-base64">
      <Row>
        <Col span={12} style={{ padding: '10px' }}>
          文本： <CopyToClipboard value={raw} />
          <Input.TextArea
            style={{ height: '90vh' }}
            value={raw}
            onChange={handleRawChange}
          />
        </Col>
        <Col span={12} style={{ padding: '10px' }}>
          编码： <CopyToClipboard value={encoded} />
          <Input.TextArea
            style={{ height: '90vh' }}
            value={encoded}
            onChange={handleEncodedChange}
          />
        </Col>
      </Row>
    </div>
  )
}

export default memo(Base64)
