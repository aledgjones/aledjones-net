import React, { useMemo } from 'react';
import { mdiEmoticonSadOutline } from '@mdi/js';

import { useStore, LoadState } from '../../store';

import { Icon, Spinner, Button } from '../../ui';

import { Header } from '../../components/header';
import { Transition } from '../../components/transition';
import { BlogEntry } from '../../components/blog-entry';
import { PortfolioEntry } from '../../components/portfolio-entry';
import { loadBlogSummaries } from '../../store/load-blog-summaries';
import { loadPortfolioSummaries } from '../../store/load-portfolio-summaries';
import { Skill } from '../../components/skill';

import './styles.css';

export const Home: React.FC = () => {

    const { theme, portfolioState, portfolioPosts, blogState, blogPosts } = useStore(s => {
        return {
            theme: s.ui.theme,
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

    return <Transition className="home">
        <Header title="Aled Jones" subtitle="Front End Web Developer" />
        <div className="center-block">

            <section className="home__about">
                <p>Hi, I'm Aled! I am a creatve and passionate front-end developer with a deep interest in emerging technologies and how people use and interact with them. I am dedicated to long term learning and I'm fascinated by finding more efficient, productve and extensible ways to produce high quality code. I'm a keen musician and love nothing more than project which combine both my passions -- coding and music.</p>
            </section>

            <section className="home__columns home__tiles">

                <div className="home__column">
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

                <div className="home__column">
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

            <section className="home__skills">
                <h2>Skills</h2>
                <div className="home__columns">
                    <div className="home__column">
                        <h3>Languages</h3>
                        <Skill color={theme} skill="HTML" level={7} />
                        <Skill color={theme} skill="CSS" level={7} />
                        <Skill color={theme} skill="Javascript (ES5/6/7)" level={7} />
                        <Skill color={theme} skill="Typescript" level={7} />
                        <Skill color={theme} skill="Python" level={5} />
                        <Skill color={theme} skill="PHP" level={5} />
                        <Skill color={theme} skill="Rust" level={2} />
                        <Skill color={theme} skill="WASM" level={2} />
                        <Skill color={theme} skill="mySQL" level={5} />
                        <Skill color={theme} skill="MongoDB" level={5} />
                    </div>
                    <div className="home__column">
                        <h3>Frameworks / Libraries</h3>
                        <Skill color={theme} skill="React" level={7} />
                        <Skill color={theme} skill="Redux" level={6} />
                        <Skill color={theme} skill="Angular (2+)" level={6} />
                        <Skill color={theme} skill="AngularJS" level={5} />
                        <Skill color={theme} skill="Firebase" level={7} />
                        <Skill color={theme} skill="ExpressJS" level={6} />
                        <Skill color={theme} skill="Wordpress" level={6} />
                        <Skill color={theme} skill="Git" level={5} />
                    </div>
                </div>
            </section>
        </div>
    </Transition>
}
