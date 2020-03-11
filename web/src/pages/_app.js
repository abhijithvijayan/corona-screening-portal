import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// common styling
import '../styles/main.scss';

import Home from './index';
import NotFound from './not-found';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/base/_variables.scss');

const ReactApp = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="" component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
};

export default ReactApp;
