import React from 'react';
import { Link } from 'react-router-dom';
import { mdiOpenInNew } from '@mdi/js';

import { BlogPostSummary } from '../../store';

import { merge } from '../../ui/utils/merge';
import { Icon, Image } from '../../ui';

import { Tags } from '../tags';

import './styles.css';

interface Props {
    entry: BlogPostSummary;
    className?: string;
}

export const BlogEntry: React.FC<Props> = ({ entry, className }) => {
    return <div className={merge("blog-entry", className)}>
        <div className="blog-entry__image-container">
            <Link to={`/blog/posts/${entry.slug}`}>
                <Image size="cover" className="blog-entry__image" src={entry.image[0].url} x={16} y={9} color="rgba(255,255,255,.05)" />
                <Icon className="blog-entry__icon" path={mdiOpenInNew} color="#ffffff" size={24} />
            </Link>
        </div>
        <div className="blog-entry__content">
            <Link to={`/blog/posts/${entry.slug}`}>
                <h2 className="blog-entry__title">{entry.title}</h2>
            </Link>
            <Tags tags={entry.tags} />
            <p className="blog-entry__summary">{entry.summary}</p>
            <div className="blog-entry__meta">
                <img alt="avatar" className="blog-entry__avatar" height="24" width="24" src={entry.avatar[0].url} />
                <span className="blog-entry__author">{entry.author}</span>
                <span className="blog-entry__sep">&#183;</span>
                <span>{entry.readTime} MIN READ</span>
            </div>
        </div>
    </div>
}
