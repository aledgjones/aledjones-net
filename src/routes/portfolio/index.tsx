import React from 'react';
import { mdiEmoticonSadOutline, mdiOpenInNew } from '@mdi/js';
import { Link } from 'react-router-dom';

import { loadPortfolioSummaries } from '../../store/load-portfolio-summaries';
import { PortfolioPostSummary, LoadState, useStore } from '../../store';
import { Spinner, Icon, Button, Image } from '../../ui';

import { Header } from '../../components/header';
import { Transition } from '../../components/transition';

import './styles.css';

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
                {posts.map(post => {
                    return <div key={post.id} className="portfolio-entry">
                        <div className="portfolio-entry__image-container">
                            <Link to={`/portfolio/${post.slug}`}>
                                <Image size="contain" className="portfolio-entry__image" src={post.thumb[0].url} x={16} y={9} color="rgba(255,255,255,.05)" />
                                <Icon className="portfolio-entry__icon" path={mdiOpenInNew} color="#ffffff" size={24} />
                            </Link>
                        </div>
                        <div className="portfolio-entry__content">
                            <Link to={`/portfolio/${post.slug}`}>
                                <h2 className="portfolio-entry__title">{post.title}</h2>
                            </Link>
                            <h3 className="portfolio-entry__subtitle">{post.subtitle}</h3>
                            <p className="portfolio-entry__summary">{post.summary}</p>
                        </div>
                    </div>
                })}
            </div>
        </Transition>;
    }

    return null;
}
