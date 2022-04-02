import { Layout, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { AlignLeftOutlined, ClockCircleOutlined, HomeOutlined } from '@ant-design/icons'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import './App.css'
import { RouteOpts } from './types/index'

import Index from './pages/index'
import Json from './pages/json'
import Time from './pages/time'

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
    icon: AlignLeftOutlined
  },
  {
    title: '时间转换',
    path: '/time',
    component: Time,
    icon: ClockCircleOutlined
  }
]

function App () {
  const [current, setCurrent] = useState('all')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setCurrent(location.pathname.split('/')[1] || 'all')
  }, [location])

  const handleClick = (e: any) => {
    setCurrent(e.key)
    switch (e.key) {
    case 'all':
      navigate('/')
      break
    default:
      navigate(`/${e.key}`)
    }
  }

  return (
    <Layout className='app'>
      <Layout.Sider style={{ backgroundColor: '#fff', height: '100%' }}>
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="vertical"
        >
          <Menu.Item key="all" icon={<HomeOutlined />}>
            首页
          </Menu.Item>
          <Menu.ItemGroup title="转换类">
            <Menu.Item key="time" icon={<ClockCircleOutlined />}>
              时间
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="格式类">
            <Menu.Item key="json" icon={<AlignLeftOutlined />}>
              JSON
            </Menu.Item>
          </Menu.ItemGroup>
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
        </Routes>
      </Layout.Content>
    </Layout>
  )
}

export default App
