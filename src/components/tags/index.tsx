import React from 'react';
import { mdiBookmarkOutline } from '@mdi/js';
import { Icon } from '../../ui';
import { merge } from '../../ui/utils/merge';
import { Link } from 'react-router-dom';

import './styles.css';

interface Props {
    className?: string;
    tags: string[];
}

export const Tags: React.FC<Props> = ({ tags, className }) => {
    return <div className={merge("tags", className)}>
        {tags.map(tag => {
            return <Link className="tag" key={tag} to={`/blog/tags/${tag.replace(' ', '-')}`}>
                <Icon style={{ marginRight: 2 }} path={mdiBookmarkOutline} size={20} color="#ffffff" />
                <span>{tag}</span>
            </Link>;
        })}
    </div>;
}
