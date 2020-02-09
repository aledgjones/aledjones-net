import React from 'react';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share";
import { mdiEmoticonSadOutline, mdiEmail, mdiFacebookBox, mdiTwitterBox, mdiLinkedinBox } from '@mdi/js';
import { useParams, Link } from "react-router-dom";

import { Spinner, Icon, Button } from '../../ui';
import { useStyle } from '../../ui/utils/style';

import { Header } from '../../components/header';
import { useBlogPost, useStore } from '../../shell/store';
import { Transition } from '../../components/transition';
import { Tags } from '../../components/tags';
import Color from 'color';

import './styles.css';
import 'highlight.js/styles/vs2015.css';

export const BlogPost: React.FC = () => {

    const { slug } = useParams();
    const { post, loading } = useBlogPost(slug);
    const theme = useStore(s => s.ui.theme);

    useStyle(`.blog-post__content blockquote { border-left: 4px solid ${theme}; background-color: ${Color(theme).alpha(.1).toString()}; }`);
    useStyle(`.blog-post__content a { color: ${theme}; }`);
    useStyle(`.blog-post__content blockquote > p { color: ${theme} !important; }`);

    // loading
    if (loading) {
        return <div className="blog-post--loading center-block">
            <Spinner color='#ffffff' size={36} />
        </div>;
    }

    // exits but loading / loaded
    if (!loading && post) {

        const url = `https://aledjones.net/blog/posts/${slug}`;
        const body = `Take a look at this blog post from aledjones.net: "${post.title}"`;

        return <Transition>
            <Header title={post.title} subtitle={`Posted by ${post.author}`}>
                <div className="blog-post__share">
                    <EmailShareButton className="blog-post__share-item blog-post__share-item--email" url={url} subject={post.title} body={body}>
                        <Icon path={mdiEmail} size={24} color="#ffffff" />
                    </EmailShareButton>
                    <FacebookShareButton className="blog-post__share-item" url={url} quote={body}>
                        <Icon path={mdiFacebookBox} size={24} color="#ffffff" />
                    </FacebookShareButton>
                    <TwitterShareButton className="blog-post__share-item" url={url} title={body} via="aledgjones" hashtags={post.tags}>
                        <Icon path={mdiTwitterBox} size={24} color="#ffffff" />
                    </TwitterShareButton>
                    <LinkedinShareButton className="blog-post__share-item" url={url} title={post.title} summary={body}>
                        <Icon path={mdiLinkedinBox} size={24} color="#ffffff" />
                    </LinkedinShareButton>
                </div>
                <Tags className="blog-post__tags" tags={post.tags} />
            </Header>
            <div className="center-block">
                <div className="blog-post__content" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </Transition>;
    }

    // not found
    return <Transition>
        <div className="blog--loading center-block">
            <Icon path={mdiEmoticonSadOutline} color="#ffffff" size={64} />
            <p className="blog__lonely">Opps, something went wrong getting that post</p>
            <Link to="/blog">
                <Button color="white" outline compact>View all posts</Button>
            </Link>
        </div>
    </Transition>;



}
