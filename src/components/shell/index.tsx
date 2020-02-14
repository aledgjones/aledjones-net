import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { useStore } from '../../store';
import { loadBlogSummaries } from "../../store/load-blog-summaries";
import { loadPortfolioSummaries } from '../../store/load-portfolio-summaries';

import { Background } from '../background';
import { ShellHeader } from '../shell-header';
import { ShellFooter } from '../shell-footer';

import { Home } from '../../routes/home';
import { Portfolio } from '../../routes/portfolio';
import { PortfolioPost } from '../../routes/portfolio-post';
import { Blog } from '../../routes/blog';
import { BlogPost } from '../../routes/blog-post';
import { Contact } from '../../routes/contact';

import './styles.css';

export const Shell: React.FC = () => {

    useEffect(() => {
        loadBlogSummaries();
        loadPortfolioSummaries();
    }, []);

    const theme = useStore(s => s.ui.theme);

    return <Router>
        <Background color={theme} highlight="#ef0665" />
        <ShellHeader />    

        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/portfolio">
                <Portfolio />
            </Route>
            <Route path="/portfolio/:slug">
                <PortfolioPost />
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
