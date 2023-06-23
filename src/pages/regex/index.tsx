import { Card, Col, Input, List, Row, Select, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import _ from 'lodash'
import { useEffect, useState } from 'react'

const Option = Select.Option
const defaultText = `abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ
0123456789 _+-.,!@#$%^&*();/|
12345 -98.7 3.141 .6180 9,000 +42
555.123.4567 +1-(800)-555-2468`

function RegexTester () {
  const [flags, setFlags] = useState<string[]>(['g'])
  const [text, setText] = useState<string>(defaultText)
  const [textHtml, setTextHtml] = useState<string>(defaultText)
  const [reg, setReg] = useState('[a-z]')
  const [regStatus, setRegStatus] = useState<any>('')
  const [matchList, setMatchList] = useState<RegExpMatchArray[]>([])

  const handleTextChange = (e: any) => {
    setText(e.target.val)
  }

  const handleRegChange = (e: any) => {
    setReg(e.target.value)
    setRegStatus('')
  }

  const replaceHandler = (s: string) => (
    `<span style="color:red;font-weight:700;">${s}</span>`
  )

  const renderTextHtml = (text: string, reg: string, flags: string[]) => {
    try {
      const re = new RegExp(reg, flags.join(''))
      const html = _.replace(text, re, replaceHandler).replaceAll('\n', '<br/>')
      const matchList = Array.from(text.matchAll(re))
      setTextHtml(html)
      setMatchList(matchList)
    } catch (error) {
      setRegStatus('error')
      // console.log(error)
    }
  }

  const renderMatchItem = (item: RegExpMatchArray, index: number) => {
    const s = item[0]
    const idx = item.index || 0
    return (
      <List.Item style={{ justifyContent: 'space-evenly' }}>
        <span>{`Match ${index + 1}: ${s}`}</span>
        <span>{`Index: ${idx}-${idx + s.length}`}</span>
      </List.Item>
    )
  }

  useEffect(() => {
    renderTextHtml(text, reg, flags)
  }, [text, reg, flags])

  return (
    <Space direction='vertical' size='large' style={{ margin: '20px', width: '80%' }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={16}>
          <p>Regular Expression</p>
          <Input
            addonBefore='/'
            addonAfter={'/' + flags.join('')}
            value={reg}
            onChange={handleRegChange}
            status={regStatus}
          />
        </Col>
        <Col span={8}>
          <p>Expression flags</p>
          <Select defaultValue={flags} title='Expression flags' mode='multiple' onChange={setFlags} popupMatchSelectWidth={false}>
            <Option value="d">hasIndices</Option>
            <Option value="g">global</Option>
            <Option value="i">ignoreCase</Option>
            <Option value="m">multiline</Option>
            <Option value="s">dotAll</Option>
            <Option value="u">unicode</Option>
            <Option value="v">unicodeSets</Option>
            <Option value="y">sticky</Option>
          </Select>
        </Col>
      </Row>
      <Row>
        <p>Text</p>
        <TextArea value={text} onChange={handleTextChange} autoSize={{ minRows: 2, maxRows: 20 }} allowClear />
      </Row>
      <Row>
        <p>Text Match</p>
        <Card style={{ width: '100%' }}>
          <div dangerouslySetInnerHTML={{ __html: textHtml }}></div>
        </Card>
      </Row>
      <Row>
        <p>Match List</p>
        <List
          style={{ width: '100%' }}
          size="small"
          bordered
          dataSource={matchList}
          renderItem={renderMatchItem}
        />
      </Row>
    </Space>
  )
}

export default RegexTester
