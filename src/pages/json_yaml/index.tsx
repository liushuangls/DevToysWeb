import React from 'react'
import { Button, Col, Input, Row, Select } from 'antd'
import CopyToClipboard from '../../components/copy'
import { stringify, parse } from 'yaml'
import { useMap } from 'react-use'

function JsonYaml () {
  const [data, { set, setAll }] = useMap({
    json: '',
    jsonIndex: 2,
    jsonStatus: '',
    yaml: '',
    yamlIndent: 2,
    yamlStatus: ''
  })

  const jsonChange = (val: string) => {
    set('json', val)
    try {
      const obj = JSON.parse(val)
      set('yaml', stringify(obj, { indent: data.jsonIndex }))
      set('jsonStatus', '')
    } catch (e: any) {
      set('jsonStatus', 'error')
    }
  }

  const formatJson = (val: string, n: number) => {
    val = val || data.json
    n = n || data.jsonIndex
    try {
      setAll({
        ...data,
        json: JSON.stringify(JSON.parse(val), null, n),
        jsonStatus: ''
      })
    } catch (e: any) {
      set('json', val)
      set('jsonStatus', 'error')
    }
  }

  const changeJsonIndent = (n: number) => {
    set('jsonIndex', n)
    formatJson(data.json, n)
  }

  const yamlChange = (val: string) => {
    set('yaml', val)
    try {
      const obj = parse(val)
      set('json', JSON.stringify(obj, null, data.jsonIndex))
      set('yamlStatus', '')
    } catch (error) {
      set('yamlStatus', 'error')
    }
  }

  const formatYaml = (val: string, n: number) => {
    val = val || data.yaml
    n = n || data.yamlIndent
    try {
      setAll({
        ...data,
        yaml: stringify(parse(val), { nullStr: '', indent: n }),
        yamlStatus: ''
      })
    } catch (error) {
      set('yaml', val)
      set('yamlStatus', 'error')
    }
  }

  const changeYamlIndent = (n: number) => {
    set('yamlIndent', n)
    formatYaml(data.yaml, n)
  }

  return (
    <div className="json-yaml">
      <Row>
        <Item
          value={data.json}
          status={data.jsonStatus}
          defaultIndent={data.jsonIndex}
          indentSelects={[0, 2, 4]}
          placeholder='JSON content'
          onIndentChange={changeJsonIndent}
          onValueChange={jsonChange}
          onFormat={() => formatJson('', 0)}
        />
        <Item
          value={data.yaml}
          status={data.yamlStatus}
          defaultIndent={data.yamlIndent}
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
