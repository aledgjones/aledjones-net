import React, { useState } from 'react';
import { mdiEmoticonSadOutline, mdiOpenInNew, mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { useParams, Link } from "react-router-dom";

import { Spinner, Icon, Button } from '../../ui';

import { Header } from '../../components/header';
import { usePortfolioPost } from '../../store/use-portfolio-post';
import { Transition } from '../../components/transition';
import { MarkdownContent } from '../../components/markdown-content';
import { Blob } from '../../components/blob';

import mac from '../../assets/mac.png';

import './styles.css';
import { Technologies } from '../../components/technologies';

export const PortfolioPost: React.FC = () => {

    const { slug } = useParams();
    const { post, loading } = usePortfolioPost(slug);
    const [i, setI] = useState(0);

    // loading
    if (loading) {
        return <div className="portfolio-post--loading center-block">
            <Spinner color='#ffffff' size={36} />
        </div>;
    }

    // exits but loading / loaded
    if (!loading && post) {

        const len = post.screenshots.length;
        const screen = {
            ...post.screenshots[i],
            img: post.screenshots[i].img[0].url
        }

        return <Transition className="portfolio-post">

            <Header title={post.title} subtitle={post.subtitle}>
                <Link className="portfolio-post__url" to={post.url}>
                    <Icon style={{ marginRight: 8 }} path={mdiOpenInNew} size={24} color="#ffffff" />
                    <span>{post.displayUrl}</span>
                </Link>
            </Header>

            <div className="portfolio-post__section--one center-block">
                <div className="portfolio-post__mac">

                    <Icon onClick={() => setI(ii => i > 0 ? ii - 1 : 0)} disabled={i === 0} className="portfolio-post__arrow portfolio-post__arrow--left" path={mdiChevronLeft} color="#ffffff" size={36} />
                    <Icon onClick={() => setI(ii => i < len ? ii + 1 : len - 1)} disabled={i === len - 1} className="portfolio-post__arrow portfolio-post__arrow--right" path={mdiChevronRight} color="#ffffff" size={36} />

                    <img className="portfolio-post__mac-image" src={mac} />
                    <div className="portfolio-post__screen" style={{ backgroundImage: `url(${screen.img})` }} />
                    <div className="portfolio-post__blobs">
                        {screen.blobs.map(blob => {
                            return <Blob key={blob.uniqueKey} x={blob.x} y={blob.y} label={blob.description} />
                        })}
                    </div>

                </div>
            </div>

            <div className="portfolio-post__section--two">
                <div className="center-block">
                    <h3>Technologies</h3>
                    <div className="portfolio-post__technologies">
                        <Technologies type="server" names={post.technologies.server} />
                        <Technologies type="client" names={post.technologies.client} />
                    </div>
                    <h3>Brief</h3>
                    <p>{post.brief}</p>
                </div>
            </div>

            <div className="portfolio-post__section--four">
                <div className="center-block">
                    <MarkdownContent markdown={post.content} />
                </div>
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
