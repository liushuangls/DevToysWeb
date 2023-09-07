import { useState } from 'react'
import { Button, Col, Input, Row, Select } from 'antd'
import CopyToClipboard from '../../components/copy'
import { stringify, parse } from 'yaml'

function JsonYaml () {
  const [json, setJson] = useState('')
  const [jsonIndent, setJsonIndent] = useState(2)
  const [jsonStatus, setJsonStatus] = useState('')
  const [yaml, setYaml] = useState('')
  const [yamlIndent, setYamlIndent] = useState(2)
  const [yamlStatus, setYamlStatus] = useState('')

  const jsonChange = (val: string) => {
    setJson(val)
    try {
      const obj = JSON.parse(val)
      setYaml(stringify(obj, { indent: jsonIndent }))
      setJsonStatus('')
    } catch (e: any) {
      setJsonStatus('error')
    }
  }

  const formatJson = (val: string, n: number) => {
    val = val || json
    n = n || jsonIndent
    try {
      setJson(JSON.stringify(JSON.parse(val), null, n))
      setJsonStatus('')
    } catch (e: any) {
      setJson(val)
      setJsonStatus('error')
    }
  }

  const changeJsonIndent = (n: number) => {
    setJsonIndent(n)
    formatJson(json, n)
  }

  const yamlChange = (val: string) => {
    setYaml(val)
    try {
      const obj = parse(val)
      setJson(JSON.stringify(obj, null, jsonIndent))
      setYamlStatus('')
    } catch (error) {
      setJsonStatus('error')
    }
  }

  const formatYaml = (val: string, n: number) => {
    val = val || yaml
    n = n || yamlIndent
    try {
      setYaml(stringify(parse(val), { nullStr: '', indent: n }))
      setYamlStatus('')
    } catch (error) {
      setYaml(val)
      setYamlStatus('error')
    }
  }

  const changeYamlIndent = (n: number) => {
    setYamlIndent(n)
    formatYaml(yaml, n)
  }

  return (
    <div className="json-yaml">
      <Row>
        <Item
          value={json}
          status={jsonStatus}
          defaultIndent={jsonIndent}
          indentSelects={[0, 2, 4]}
          placeholder='JSON content'
          onIndentChange={changeJsonIndent}
          onValueChange={jsonChange}
          onFormat={() => formatJson('', 0)}
        />
        <Item
          value={yaml}
          status={yamlStatus}
          defaultIndent={yamlIndent}
          indentSelects={[2, 4]}
          placeholder='YAML content'
          onIndentChange={changeYamlIndent}
          onValueChange={yamlChange}
          onFormat={() => formatYaml('', 0)}
        />
      </Row>
    </div>
  )
}

interface IProps {
  value: string
  status: string
  defaultIndent: number
  indentSelects: number[]
  placeholder: string
  onIndentChange: (n: number) => void
  onValueChange: (val: string) => void
  onFormat: () => void
}

function Item ({ value, status, defaultIndent, indentSelects, placeholder, onValueChange, onFormat, onIndentChange }: IProps) {
  return (
    <Col span={12} style={{ padding: '10px' }}>
      <Row justify='start' align='middle'>
        <Col span={6}>
          indent:
          <Select
            defaultValue={defaultIndent}
            onSelect={onIndentChange}
            style={{ marginLeft: '9px' }}
          >
            {
              indentSelects.map((n) => (
                <Select.Option key={n} value={n}>{n}</Select.Option>
              ))
            }
          </Select>
        </Col>
        <Col span={6}>
          <Button size={'small'} type='default' onClick={() => onFormat()} >format</Button>
        </Col>
        <Col span={6}>
          <CopyToClipboard value={value} />
        </Col>
      </Row>
      <div>
        <Input.TextArea
          onChange={(e) => onValueChange(e.target.value)}
          value={value}
          status={status as any}
          placeholder={placeholder}
          showCount={true}
          styles={{ textarea: { minHeight: '90vh' } }}
        />
      </div>
    </Col>
  )
}

export default JsonYaml
