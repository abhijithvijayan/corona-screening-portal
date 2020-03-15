import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';
import Sidebar from '../components/Dashboard/Sidebar';
import PatientsView from '../components/Dashboard/Patients/PatientsView';
import SuspectsView from '../components/Dashboard/Suspects/SuspectsView';
import Map from '../components/Map';

const routes = [
    {
        path: '/',
        exact: true,

        component: () => {
            return <div>Home</div>;
        },
    },
    {
        path: '/patients',
        component: PatientsView,
    },
    {
        path: '/suspects',
        component: SuspectsView,
    },
    {
        path: '/view/map',
        component: Map,
    },
];

const IndexPage = () => {
    return (
        <>
            <Router>
                <Layout>
                    <Sidebar />
                    <Dashboard>
                        <Switch>
                            {routes.map((route, index) => {
                                return (
                                    <Route key={index} path={route.path} exact={route.exact}>
                                        <route.component />
                                    </Route>
                                );
                            })}
                        </Switch>
                    </Dashboard>
                </Layout>
            </Router>
        </>
    );
};

export default IndexPage;
