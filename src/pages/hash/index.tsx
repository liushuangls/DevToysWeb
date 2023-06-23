import { Col, Input, Row, Select, Space, Switch } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import sha256 from 'crypto-js/sha256'
import { MD5, SHA1, SHA512 } from 'crypto-js'
import CopyToClipboard from '../../components/copy'
import Base64 from 'crypto-js/enc-base64'

function Hash () {
  const [outputType, setOutputType] = useState('Hex')
  const [uppercase, setUppercase] = useState(false)
  const [text, setText] = useState('')
  const [hash, setHash] = useState<Record<string, string>>({})

  const textChange = (e: any) => {
    const val = e.target.value
    setText(val)
  }

  useEffect(() => {
    const hash: Record<string, any> = { MD5: '', SHA1: '', SHA256: '', SHA512: '' }
    if (text === '') {
      setHash(hash)
      return
    }
    hash.MD5 = MD5(text)
    hash.SHA1 = SHA1(text)
    hash.SHA256 = sha256(text)
    hash.SHA512 = SHA512(text)
    if (outputType === 'Base64') {
      Object.entries(hash).forEach((val) => {
        hash[val[0]] = Base64.stringify(val[1])
      })
    } else {
      Object.entries(hash).forEach((val) => {
        hash[val[0]] = val[1].toString()
      })
    }
    if (uppercase) {
      Object.entries(hash).forEach((val) => {
        hash[val[0]] = val[1].toUpperCase()
      })
    }
    setHash(hash)
  }, [text, uppercase, outputType])

  return (
    <Space direction='vertical' style={{ margin: '20px', width: '80%' }}>
      <Row>
        <Col span={6}>
          <span style={{ paddingRight: '10px' }}>Output Type:</span>
          <Select title='Output Type' value={outputType} onChange={setOutputType} popupMatchSelectWidth={false}>
            <Select.Option value='Hex'>Hex</Select.Option>
            <Select.Option value='Base64'>Base64</Select.Option>
          </Select>
        </Col>
        <Col span={6}>
          <span style={{ paddingRight: '10px' }}>Uppercase:</span>
          <Switch title='Uppercase' onChange={setUppercase} />
        </Col>
      </Row>
      <Row>
        <p>Input</p>
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} allowClear value={text} onChange={textChange} />
      </Row>
      {
        Object.entries(hash).map((val) => (
          <Row key={val[0]} style={{ marginTop: '20px' }}>
            <p>{val[0]} <CopyToClipboard value={val[1]} /></p>
            <Input value={val[1]}/>
          </Row>
        ))
      }
    </Space>
  )
}

export default Hash
