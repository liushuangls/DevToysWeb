import { Col, Input, Row } from 'antd'
import { memo, useState } from 'react'
import CopyToClipboard from '../../components/copy'
import _ from 'lodash'

function Html () {
  const [raw, setRaw] = useState('')
  const [encoded, setEncoded] = useState('')

  const handleRawChange = (e: any) => {
    setRaw(e.target.value)
    setEncoded(_.escape(e.target.value))
  }

  const handleEncodedChange = (e: any) => {
    setEncoded(e.target.value)
    try {
      setRaw(_.unescape(e.target.value))
    } catch (e: any) {
      setRaw(e)
    }
  }

  return (
    <div className="page-base64">
      <Row>
        <Col span={12} style={{ padding: '10px' }}>
          解码： <CopyToClipboard value={raw} />
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

export default memo(Html)
