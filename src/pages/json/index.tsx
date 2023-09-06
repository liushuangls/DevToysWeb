import { Col, Input, Row, Select } from 'antd'
import { useState } from 'react'
import CopyToClipboard from '../../components/copy'

function Json () {
  const [target, setTarget] = useState('')
  const [indent, setIndent] = useState(2)

  const renderJson = (val: string, indent: number) => {
    try {
      setTarget(JSON.stringify(JSON.parse(val), null, indent))
    } catch (e: any) {
      setTarget(e)
    }
  }

  const changeIndent = (n: number) => {
    setIndent(n)
    renderJson(target, n)
  }

  return (
    <div className="page-json">
      <Row>
        <Col span={12} style={{ padding: '10px' }}>
          <Input.TextArea
            onChange={(e) => renderJson(e.target.value, indent)}
            placeholder="json content"
            showCount={true}
            styles={{textarea: {minHeight: '90vh'}}}
          />
        </Col>
        <Col span={12} style={{ padding: '10px' }}>
          <Row justify='start' align='middle'>
            <Col span={6}>
              indent:
              <Select
                defaultValue={indent}
                onSelect={changeIndent}
                style={{ marginLeft: '10px' }}
              >
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={4}>4</Select.Option>
                <Select.Option value={0}>0</Select.Option>
              </Select>
            </Col>
            <Col span={6}>
              <CopyToClipboard value={target} />
            </Col>
          </Row>
          <div>
            <Input.TextArea
              value={target}
              bordered={false}
              styles={{textarea: {minHeight: '90vh'}}}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Json
