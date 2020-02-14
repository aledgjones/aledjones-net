import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mdiOpenInNew, mdiEmoticonSadOutline } from '@mdi/js';

import { useStore, LoadState } from '../../store';

import { Image, Icon, Spinner, Button } from '../../ui';

import { Header } from '../../components/header';
import { Transition } from '../../components/transition';
import { Tags } from '../../components/tags';

import './styles.css';
import { BlogEntry } from '../../components/blog-entry';
import { PortfolioEntry } from '../../components/portfolio-entry';
import { loadBlogSummaries } from '../../store/load-blog-summaries';
import { loadPortfolioSummaries } from '../../store/load-portfolio-summaries';

export const Home: React.FC = () => {

    const { portfolioState, portfolioPosts, blogState, blogPosts } = useStore(s => {
        return {
            portfolioState: s.portfolio.state,
            portfolioPosts: s.portfolio.posts,
            blogState: s.blog.state,
            blogPosts: s.blog.posts
        }
    });

    const portfolio = useMemo(() => {
        const posts = portfolioPosts.filter(i => i.featured);
        const random = Math.floor(Math.random() * posts.length);
        return posts[random];
    }, [portfolioPosts]);

    const blog = useMemo(() => {
        return blogPosts[0];
    }, [blogPosts]);

    const years = useMemo(() => {
        const date = new Date();
        return date.getFullYear() - 2015;
    }, []);

    return <Transition className="home">
        <Header title="Aled Jones" subtitle="Front End Web Developer" />
        <div className="center-block">
            <section className="home__tiles">

                <div className="home__tile">
                    {portfolioState === LoadState.loading && <div className="home__loader">
                        <Spinner className="home__spinner" size={24} color="#ffffff" />
                    </div>}

                    {portfolioState === LoadState.failed && <div className="home__failed">
                        <Icon path={mdiEmoticonSadOutline} color="#ffffff" size={64} />
                        <p className="blog__lonely">Opps, something went wrong getting that post</p>
                        <Button color="white" outline compact onClick={() => loadPortfolioSummaries()}>Retry</Button>
                    </div>}

                    {portfolioState === LoadState.ready && portfolio && <PortfolioEntry className="portfolio-entry--tile" entry={portfolio} />}
                </div>

                <div className="home__tile">
                    {blogState === LoadState.loading && <div className="home__loader">
                        <Spinner className="home__spinner" size={24} color="#ffffff" />
                    </div>}

                    {blogState === LoadState.failed && <div className="home__failed">
                        <Icon path={mdiEmoticonSadOutline} color="#ffffff" size={64} />
                        <p className="blog__lonely">Opps, something went wrong getting that post</p>
                        <Button color="white" outline compact onClick={() => loadBlogSummaries()}>Retry</Button>
                    </div>}

                    {blogState === LoadState.ready && blog && <BlogEntry className="blog-entry--tile" entry={blog} />}
                </div>

            </section>
        </div>
    </Transition>
}
