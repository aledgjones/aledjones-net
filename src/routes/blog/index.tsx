import React, { useMemo } from 'react';
import { mdiOpenInNew, mdiEmoticonSadOutline } from '@mdi/js';

import { Icon, Spinner, Image, Button } from '../../ui';

import { Header } from '../../components/header';
import { useStore, BlogPostSummary, LoadState } from '../../store';
import { loadBlogSummaries } from "../../store/load-blog-summaries";
import { Transition } from '../../components/transition';
import { Link, useParams } from 'react-router-dom';
import { Tags } from '../../components/tags';

import './styles.css';

export const Blog: React.FC = () => {

    const { tag } = useParams();

    const { state, _posts } = useStore(s => {
        return {
            state: s.blog.state,
            _posts: s.blog.posts
        }
    });

    const posts = useMemo(() => {
        if (tag) {
            return _posts.filter(p => p.tags.includes(tag.replace('-', ' ')));
        } else {
            return _posts;
        }
    }, [tag, _posts]);

    // loading
    if (state === LoadState.loading) {
        return <div className="blog--loading center-block">
            <Spinner color='#ffffff' size={36} />
        </div>;
    }

    // failed
    if (state === LoadState.failed) {
        return <Transition>
            <div className="blog--loading center-block">
                <Icon path={mdiEmoticonSadOutline} color="#ffffff" size={64} />
                <p className="blog__lonely">Opps, something went wrong getting the posts</p>
                <Button color="white" outline compact onClick={() => loadBlogSummaries()}>Retry</Button>
            </div>
        </Transition>;
    }

    // loaded but no posts for a specific tag
    if (state === LoadState.ready && tag && posts.length === 0) {
        return <Transition>
            <div className="blog--loading center-block">
                <Icon path={mdiEmoticonSadOutline} color="#ffffff" size={64} />
                <p className="blog__lonely">Opps, no posts have the "{tag?.replace('-', ' ')}" tag yet</p>
                <Link to="/blog">
                    <Button color="white" outline compact>View All Posts</Button>
                </Link>
            </div>
        </Transition>
    }

    if (state === LoadState.ready) {
        return <Transition>
            <Header title="Blog" subtitle={tag ? `Tagged: ${tag}` : "WEB DEVELOPMENT, TECHNOLOGY & MORE"} />
            <div className="center-block">
                {posts.map(post => {
                    return <div key={post.id} className="blog-entry">
                        <div className="blog-entry__image-container">
                            <Link to={`/blog/posts/${post.slug}`}>
                                <Image size="cover" className="blog-entry__image" src={post.image[0].url} x={16} y={9} color="rgba(255,255,255,.05)" />
                                <Icon className="blog-entry__icon" path={mdiOpenInNew} color="#ffffff" size={24} />
                            </Link>
                        </div>
                        <div className="blog-entry__content">
                            <Link to={`/blog/posts/${post.slug}`}>
                                <h2 className="blog-entry__title">{post.title}</h2>
                            </Link>
                            <Tags tags={post.tags} />
                            <p className="blog-entry__summary">{post.summary}</p>
                            <div className="blog-entry__meta">
                                <img alt="avatar" className="blog-entry__avatar" height="24" width="24" src={post.avatar[0].url} />
                                <span className="blog-entry__author">{post.author}</span>
                                <span className="blog-entry__sep">&#183;</span>
                                <span>{post.readTime} MIN READ</span>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </Transition>;
    }

    return null;

}
