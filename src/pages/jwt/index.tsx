import { Col, Input, Row } from 'antd'
import { memo, useState } from 'react'
import CopyToClipboard from '../../components/copy'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

function JWT () {
  const [raw, setRaw] = useState('')
  const [encoded, setEncoded] = useState('')

  const handleRawChange = (e: any) => {
    setRaw(e.target.value)
    let val
    try {
      const header = JSON.stringify(jwt_decode(e.target.value, { header: true }), null, 2)
      const payload = JSON.stringify(jwt_decode(e.target.value), null, 2)
      val = `${header}\n\n${payload}`
    } catch (err: any) {
      val = err.toString()
    }
    setEncoded(val)
  }

  return (
    <div className="page-base64">
      <Row>
        <Col span={12} style={{ padding: '10px' }}>
          Encoded: <CopyToClipboard value={raw} />
          <Input.TextArea
            style={{ height: '90vh' }}
            value={raw}
            onChange={handleRawChange}
          />
        </Col>
        <Col span={12} style={{ padding: '10px' }}>
          Decoded: <CopyToClipboard value={encoded} />
          <Input.TextArea
            style={{ height: '90vh' }}
            value={encoded}
          />
        </Col>
      </Row>
    </div>
  )
}

export default memo(JWT)
