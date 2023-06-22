import { Button, Card, Input, message } from 'antd'
import { memo, useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { saveAs } from 'file-saver'

function QrCode () {
  const [str, setStr] = useState('')
  const [size, setSize] = useState(128)
  const sizeEl = useRef<any>(null)

  const handleChange = (e: any) => {
    setStr(e.target.value)
  }

  const handleSizeChange = () => {
    const n = Number(sizeEl.current?.input.value)
    if (!isNaN(n) && (n >= 128 && n <= 512)) {
      setSize(n)
    }
  }

  const exportQrCode = () => {
    if (!str) {
      message.error('请输入内容')
      return
    }
    const canvas: any = document.querySelector('.page-qrcode canvas')
    if (canvas) {
      canvas.toBlob((blob: any) => {
        saveAs(blob, 'qrcode.png')
      })
    }
  }

  return (
    <div className="page-qrcode">
      <Card>
        <div>
          Text:
          <Input value={str} onChange={handleChange} />
        </div>
        <div style={{ margin: '20px 0' }}>
          Size(128-512)：
          <Input.Group compact>
            <Input ref={sizeEl} defaultValue={size} style={{ width: '200px' }} />
            <Button onClick={handleSizeChange}>save</Button>
          </Input.Group>
        </div>
        <div>
          <Button onClick={exportQrCode}>export QR Code</Button>
        </div>
      </Card>
      <Card>
        {
          str
            ? (
              <QRCodeCanvas
                value={str}
                size={size}
              />
            )
            : null
        }
      </Card>
    </div>
  )
}

export default memo(QrCode)
