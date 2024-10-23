import {
    CarOutlined,
    FileOutlined,
    SettingOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const getItem = (label, key, icon, children) => {
    return {
        key,
        icon,
        children,
        label,
    };
};

const items = [
    getItem('Waiting Cars', 'sub1', <CarOutlined />, [
        getItem(<Link to='/waiting-cars/create'>Create waiting car</Link>,'1'),
    ]),
    getItem('Waiting Cars List', 'sub2', <UnorderedListOutlined />, [
        getItem(<Link to='/waiting-cars/list'>List</Link>, '2'),
    ]),
    getItem('Process Parking', 'sub3', <SettingOutlined />, [
        getItem(<Link to='/process-parking/positions'>Processed positions</Link>, '3'),
    ]),
    getItem('Processed Parking Lots', 'sub4', <FileOutlined />, [
        getItem(<Link to='/processed-parking-lots/list'>List processed</Link>, '4'),
    ]),
];

const LayoutApp = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, height: '25px' }} />
                <Content style={{ margin: '16px', width: '71rem' }}>
                    <Breadcrumb 
                        style={{ margin: '16px 0' }}
                        items={[
                            { title: 'Parking' },
                            { title: 'Options' },
                        ]}
                    />
                    <div
                        style={{
                            padding: 24,
                            minHeight: 410,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', width: '85vw' }}>
                    GAPV Coder ©{new Date().getFullYear()} Created by Gustavo
                    Pereira
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutApp;
