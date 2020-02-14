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
import { BlogEntry } from '../../components/blog-entry';

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
                {posts.map(post => <BlogEntry key={post.id} entry={post} />)}
            </div>
        </Transition>;
    }

    return null;

}
