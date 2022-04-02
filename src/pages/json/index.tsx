import { Col, Input, Row, Select } from 'antd'
import { memo, useState } from 'react'
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
            placeholder="请输入json字符串"
            showCount={true}
            style={{ height: '90vh' }}
          >
          </Input.TextArea>
        </Col>
        <Col span={12} style={{ padding: '10px' }}>
          <Row justify='start' align='middle'>
            <Col span={6}>
              缩进：
              <Select
                defaultValue={indent}
                onSelect={changeIndent}
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

          </div>
          <Input.TextArea
            value={target}
            bordered={false}
            style={{ height: '90vh' }}
          ></Input.TextArea>
        </Col>
      </Row>
    </div>
  )
}

export default memo(Json)
