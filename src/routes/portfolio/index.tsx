import React from 'react';
import { mdiEmoticonSadOutline, mdiOpenInNew } from '@mdi/js';
import { Link } from 'react-router-dom';

import { loadPortfolioSummaries } from '../../store/load-portfolio-summaries';
import { PortfolioPostSummary, LoadState, useStore } from '../../store';
import { Spinner, Icon, Button, Image } from '../../ui';

import { Header } from '../../components/header';
import { Transition } from '../../components/transition';

import './styles.css';
import { PortfolioEntry } from '../../components/portfolio-entry';

export const Portfolio: React.FC = () => {

    const { state, posts } = useStore(s => {
        return {
            state: s.portfolio.state,
            posts: s.portfolio.posts
        }
    });

    // loading
    if (state === LoadState.loading) {
        return <div className="portfolio--loading center-block">
            <Spinner color='#ffffff' size={36} />
        </div>;
    }

    // failed
    if (state === LoadState.failed) {
        return <Transition>
            <div className="portfolio--loading center-block">
                <Icon path={mdiEmoticonSadOutline} color="#ffffff" size={64} />
                <p className="portfolio__lonely">Opps, something went wrong getting the posts</p>
                <Button color="white" outline compact onClick={() => loadPortfolioSummaries()}>Retry</Button>
            </div>
        </Transition>;
    }

    if (state === LoadState.ready) {
        return <Transition>
            <Header title="Portfolio" subtitle="Recent Commissions &amp; Projects" />
            <div className="center-block">
                {posts.map(post => <PortfolioEntry key={post.id} entry={post} />)}
            </div>
        </Transition>;
    }

    return null;
}
