import './App.css';
import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import {AppstoreAddOutlined, DesktopOutlined, EditOutlined} from '@ant-design/icons';

import {Link, Route, Switch} from 'react-router-dom';

import DashboardComponent from './components/sites/dashboard/DashboardComponent';
import CreateComponent from "./components/sites/create/CreateComponent";
import AddDppsComponent from "./components/sites/create/steps/AddDppsComponent";
import AddHouseholdsComponent from "./components/sites/create/steps/AddHouseholdsComponent";
import AddProducerAndStorageComponent from "./components/sites/create/steps/AddProducerAndStorageComponent";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

function App() {
    const [collapsed, setCollapse] = useState(false);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapse} style={{backgroundColor: '#00406B'}}>
                {!collapsed &&
                <img style={{padding: '16px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
                     src={'logo.svg'} alt={"Logo Universität Oldenburg"}/>
                }
                <Menu theme={"dark"} defaultSelectedKeys={[window.location.pathname]} mode="inline">
                    <Menu.Item key="/" icon={<DesktopOutlined/>}>
                        <Link to={'/'}>Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="/erstellen" icon={<AppstoreAddOutlined/>}>
                        <Link to={'/erstellen'}>VK erstellen</Link>
                    </Menu.Item>
                    <Menu.Item key="/bearbeiten" icon={<EditOutlined/>}>
                        <Link to={'/bearbeiten'}>VK bearbeiten</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{paddingLeft: '32px', backgroundColor: '#398ECE'}}>
                    <h1 className={'white'}>Planungssystem für virtuelle Kraftwerke</h1>
                </Header>
                <Content style={{margin: '48px 48px'}}>
                    <Switch>
                        <Route exact path="/"
                               render={(props) => <DashboardComponent/>}>
                        </Route>
                        <Route exact path="/erstellen"
                               render={(props) => <CreateComponent/>}>
                        </Route>
                        <Route exact path="/erstellen/schritt-1"
                               render={(props) => <AddDppsComponent/>}>
                        </Route>
                        <Route exact path="/erstellen/schritt-2"
                               render={(props) => <AddHouseholdsComponent/>}>
                        </Route>
                        <Route exact path="/erstellen/schritt-3"
                               render={(props) => <AddProducerAndStorageComponent/>}>
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
