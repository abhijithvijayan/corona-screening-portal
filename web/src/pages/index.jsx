import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';
import Sidebar from '../components/Dashboard/Sidebar';
import PatientsView from '../components/Dashboard/Patients/PatientsView';
import ContactsView from '../components/Dashboard/Contacts/ContactsView';
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
        path: '/contacts',
        component: ContactsView,
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
