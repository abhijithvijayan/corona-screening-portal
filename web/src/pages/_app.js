import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// common styling
import '../styles/main.scss';

import Index from './index';
import NotFound from './not-found';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/base/_variables.scss');

const ReactApp = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Index} />
                        <Route path="" component={NotFound} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </>
    );
};

export default ReactApp;
