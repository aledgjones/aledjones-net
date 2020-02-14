import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mdiOpenInNew } from '@mdi/js';

import { useStore, LoadState } from '../../store';

import { Image, Icon, Spinner } from '../../ui';

import { Header } from '../../components/header';
import { Transition } from '../../components/transition';
import { Tags } from '../../components/tags';

import './styles.css';

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
        const posts = portfolioPosts.filter(i => i.featured === true);
        const random = Math.floor(Math.random() * posts.length);
        return posts[random];
    }, [portfolioPosts]);

    const blog = useMemo(() => {
        return blogPosts[0];
    }, [blogPosts]);

    return <Transition className="home">
        <Header title="Aled Jones" subtitle="Front End Web Developer" />
        <div className="center-block">
            <section className="home__tiles">

                <div className="home__tile">
                    {blogState === LoadState.loading && <div className="home__loader">
                        <Spinner size={24} color="#ffffff" />
                    </div>}

                    {blogState === LoadState.failed && <div className="home__failed">
                        <p>failed</p>
                    </div>}

                    {blogState === LoadState.ready && blog && <div className="blog-entry">
                        <div className="blog-entry__image-container">
                            <Link to={`/blog/posts/${blog.slug}`}>
                                <Image size="cover" className="blog-entry__image" src={blog.image[0].url} x={16} y={9} color="rgba(255,255,255,.05)" />
                                <Icon className="blog-entry__icon" path={mdiOpenInNew} color="#ffffff" size={24} />
                            </Link>
                        </div>
                        <div className="blog-entry__content">
                            <Link to={`/blog/posts/${blog.slug}`}>
                                <h2 className="blog-entry__title">{blog.title}</h2>
                            </Link>
                            <Tags tags={blog.tags} />
                            <p className="blog-entry__summary">{blog.summary}</p>
                            <div className="blog-entry__meta">
                                <img alt="avatar" className="blog-entry__avatar" height="24" width="24" src={blog.avatar[0].url} />
                                <span className="blog-entry__author">{blog.author}</span>
                                <span className="blog-entry__sep">&#183;</span>
                                <span>{blog.readTime} MIN READ</span>
                            </div>
                        </div>
                    </div>}
                </div>

            </section>
        </div>
    </Transition>
}
