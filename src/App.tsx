import { Layout, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { AlignLeftOutlined, ClockCircleOutlined, ContainerOutlined, HomeOutlined, QrcodeOutlined } from '@ant-design/icons'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import './App.css'
import { RouteOpts } from './types'

import Index from './pages/index'
import Json from './pages/json'
import Time from './pages/time'
import Base64 from './pages/base64'
import URL from './pages/url'
import Html from './pages/html'
import JWT from './pages/jwt'
import Qrcode from './pages/qrcode'

const routes: RouteOpts[] = [
  {
    title: '首页',
    path: '/',
    component: Index,
    icon: HomeOutlined
  },
  {
    title: 'JSON格式化',
    path: '/json',
    component: Json,
    icon: AlignLeftOutlined,
    group: '格式类'
  },
  {
    title: '时间转换',
    path: '/time',
    component: Time,
    icon: ClockCircleOutlined,
    group: '转换类'
  },
  {
    title: 'Base64',
    path: '/base64',
    component: Base64,
    icon: ContainerOutlined,
    group: '编码/解码类'
  },
  {
    title: 'URL',
    path: '/URL',
    component: URL,
    icon: ContainerOutlined,
    group: '编码/解码类'
  },
  {
    title: 'HTML',
    path: '/html',
    component: Html,
    icon: ContainerOutlined,
    group: '编码/解码类'
  },
  {
    title: 'JWT',
    path: '/jwt',
    component: JWT,
    icon: ContainerOutlined,
    group: '编码/解码类'
  },
  {
    title: '二维码',
    path: '/qrcode',
    component: Qrcode,
    icon: QrcodeOutlined,
    group: '图像类'
  }
]

function App () {
  const [current, setCurrent] = useState('home')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      setCurrent('home')
    } else {
      setCurrent(location.pathname.split('/')[1])
    }
  }, [location])

  const handleClick = (e: any) => {
    setCurrent(e.key)
    switch (e.key) {
      case 'home':
        navigate('/')
        break
      default:
        navigate(e.key)
    }
  }

  const renderMenu = () => {
    const m: Record<string, RouteOpts[]> = {}
    routes.forEach(r => {
      let g = r.group
      if (!g) {
        g = '/'
      }
      if (m[g]) {
        m[g].push(r)
      } else {
        m[g] = [r]
      }
    })

    return Object.keys(m).map(g => {
      const title = g
      const rs = m[g]
      if (title === '/') {
        const r = rs[0]
        return (
          <Menu.Item key={r.path} icon={<r.icon />}>
            {r.title}
          </Menu.Item>
        )
      } else {
        return (
          <Menu.ItemGroup title={title} key={title}>
            {rs.map(r => (
              <Menu.Item key={r.path} icon={<r.icon />}>
                {r.title}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        )
      }
    })
  }

  return (
    <Layout className='app'>
      <Layout.Sider style={{ backgroundColor: '#fff', height: '100%' }}>
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="vertical"
        >
          { renderMenu() }
        </Menu>
      </Layout.Sider>
      <Layout.Content style={{ backgroundColor: '#fff' }}>
        <Routes>
          {routes.map(route => {
            if (route.path === '/') {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<Index routesOpts={routes} />}
                />
              )
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            )
          })}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Layout.Content>
    </Layout>
  )
}

export default App
