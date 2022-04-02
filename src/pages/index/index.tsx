import Icon from '@ant-design/icons'
import { Card, Col, Row } from 'antd'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { RouteOpts } from '../../types'

interface Props {
  routesOpts: RouteOpts[];
}

const Index: React.FC<Props> = ({ routesOpts }) => {
  const navigate = useNavigate()

  return (
    <div className="page-index">
      <Row wrap={true}>
        {
          routesOpts.map((route) => {
            if (route.path === '/') return null
            return (
              <Col span={5} key={route.path}>
                <Card
                  style={{ padding: '20px 10px', margin: '15px', textAlign: 'center' }}
                  hoverable
                  onClick={() => navigate(route.path)}
                >
                  <div>
                    <Icon component={route.icon} style={{ fontSize: '30px' }} />
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '16px' }}>
                    {route.title}
                  </div>
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </div>
  )
}

export default memo(Index)
