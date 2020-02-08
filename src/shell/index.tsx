import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { useStore, loadPostSummaries } from './store';
import { Background } from '../components/background';
import { ShellHeader } from '../components/shell-header';

import { Home } from '../routes/home';
import { Portfolio } from '../routes/portfolio';
import { Blog } from '../routes/blog';
import { Contact } from '../routes/contact';
import { ShellFooter } from '../components/footer';
import { BlogPost } from '../routes/blog-post';

import './shell.css';

export const Shell: React.FC = () => {

    useEffect(() => {
        loadPostSummaries();
    }, []);

    const theme = useStore(s => s.ui.theme);

    return <Router>
        <Background color={theme} />
        <ShellHeader />    

        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/portfolio">
                <Portfolio />
            </Route>
            <Route exact path="/blog">
                <Blog />
            </Route>
            <Route exact path="/blog/posts">
                <Redirect to="/blog" />
            </Route>
            <Route path="/blog/posts/:slug">
                <BlogPost />
            </Route>
            <Route exact path="/blog/tags">
                <Redirect to="/blog" />
            </Route>
            <Route path="/blog/tags/:tag">
                <Blog />
            </Route>
            <Route path="/contact">
                <Contact />
            </Route>
        </Switch>

        <ShellFooter />
    </Router>;
}
