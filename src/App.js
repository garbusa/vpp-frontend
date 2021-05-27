import './App.css';
import React, {useContext, useEffect, useState} from 'react';
import {Layout, Menu} from 'antd';
import {AppstoreAddOutlined, DesktopOutlined, EditOutlined} from '@ant-design/icons';

import {Link, Route, Switch} from 'react-router-dom';

import DashboardComponent from './components/sites/dashboard/DashboardComponent';
import CreateComponent from "./components/sites/create/CreateComponent";
import AddDppsComponent from "./components/sites/create/steps/AddDppsComponent";
import AddHouseholdsComponent from "./components/sites/create/steps/AddHouseholdsComponent";
import AddProducerAndStorageComponent from "./components/sites/create/steps/AddProducerAndStorageComponent";
import EditComponent from "./components/sites/edit/EditComponent";
import {ServiceLoading} from "./components/ui/loading/ServiceLoading";
import {RootStoreContext} from "./store/RootStore";
import {observer} from "mobx-react";

const {Header, Content, Sider} = Layout;

/**
 * Diese Komponente ist die Haupt-Komponente der Applikation und beinhaltet das Layout,
 * sowie das Routing-Template für die einzelnen Webseiten
 * @type {function(): *}
 */
export const App = observer(() => {
    const [collapsed, setCollapse] = useState(false);

    const vppStore = useContext(RootStoreContext).vppStore;

    useEffect(() => {
        setInterval(() => {
            vppStore.isHealthy();
        }, 5000);
    }, []);

    return (
        <div>
            <ServiceLoading servicesOnline={vppStore.servicesOnline}/>

            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={setCollapse} style={{backgroundColor: '#00406B'}}>
                    {!collapsed &&
                    <img style={{padding: '16px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
                         src={'logo.png'} alt={"Logo Universität Oldenburg"}/>
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
                    <Header className="site-layout-background"
                            style={{paddingLeft: '32px', backgroundColor: '#398ECE'}}>
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
                            <Route exact path="/bearbeiten"
                                   render={(props) => <EditComponent/>}>
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
});