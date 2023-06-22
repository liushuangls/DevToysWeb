import { Button, Card, Input, message, Select, Space } from 'antd'
import { format, formatISO, getUnixTime } from 'date-fns'
import { memo, useState } from 'react'

import CopyToClipboard from '../../components/copy'

const defaultFormat = 'yyyy-MM-dd HH:mm:ss'

function Time () {
  const [date, setDate] = useState(new Date())
  const [unit, setUnit] = useState('s')
  const [dateStr, setDateStr] = useState('')

  const handleInput = (e: any) => {
    const val = Number(e.target.value)
    if (!isNaN(val)) {
      if (unit === 'ms') {
        setDate(new Date(val))
      } else {
        setDate(new Date(val * 1000))
      }
    }
  }

  const getShowTime = () => {
    if (unit === 's') {
      return getUnixTime(date)
    }
    return date.getTime()
  }

  const getUTCStr = () => {
    const y = date.getUTCFullYear().toString()
    const M = (date.getUTCMonth() + 1).toString().padStart(2, '0')
    const d = date.getUTCDate().toString().padStart(2, '0')
    const h = date.getUTCHours().toString().padStart(2, '0')
    const m = date.getUTCMinutes().toString().padStart(2, '0')
    const s = date.getUTCSeconds().toString().padStart(2, '0')
    return `${y}-${M}-${d} ${h}:${m}:${s}`
  }

  const convertDateStr = () => {
    if (!dateStr) {
      return
    }
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) {
      message.error('invalid format')
      return
    }
    setDate(d)
  }

  return (
    <div className="page-time">
      <Space
        direction='vertical'
        size={'small'}
        style={{ minWidth: '500px', padding: '20px' }}
      >
        <Card>
          Unix timestamp:
          <Input.Group compact style={{ marginTop: '10px' }}>
            <Input
              style={{ width: 'calc(100% - 200px)' }}
              value={getShowTime()}
              onChange={handleInput}
            />
            <Select value={unit} onSelect={(val: string) => setUnit(val)}>
              <Select.Option value='s'>s</Select.Option>
              <Select.Option value='ms'>ms</Select.Option>
            </Select>
          </Input.Group>
          <div style={{ padding: '10px 0' }}>
            <Button type="primary" onClick={() => setDate(new Date())} size={'small'}>
              now
            </Button>
          </div>
          <div>
            time string:
            <Input.Group compact style={{ marginTop: '10px' }}>
              <Input
                style={{ width: 'calc(100% - 200px)' }}
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
              />
              <Button onClick={convertDateStr}>convert</Button>
            </Input.Group>
          </div>
        </Card>
        <Card>
          local time: {format(date, defaultFormat)}
          <CopyToClipboard value={format(date, defaultFormat)} />
        </Card>
        <Card>
          UTC time: {getUTCStr()}
          <CopyToClipboard value={getUTCStr()} />
        </Card>
        <Card>
          ISO 8601: {formatISO(date)}
          <CopyToClipboard value={formatISO(date)} />
        </Card>
      </Space>
    </div>
  )
}

export default memo(Time)
