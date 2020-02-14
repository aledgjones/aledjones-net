import React from 'react';
import { Link } from 'react-router-dom';
import { mdiOpenInNew } from '@mdi/js';

import { PortfolioPostSummary } from '../../store';

import { merge } from '../../ui/utils/merge';
import { Image, Icon } from '../../ui';

import './styles.css';

interface Props {
    entry: PortfolioPostSummary;
    className?: string;
}

export const PortfolioEntry: React.FC<Props> = ({ entry, className }) => {
    return <div className={merge("portfolio-entry", className)}>
        <div className="portfolio-entry__image-container">
            <Link to={`/portfolio/${entry.slug}`}>
                <Image size="contain" className="portfolio-entry__image" src={entry.thumb[0].url} x={16} y={9} color="rgba(255,255,255,.05)" />
                <Icon className="portfolio-entry__icon" path={mdiOpenInNew} color="#ffffff" size={24} />
            </Link>
        </div>
        <div className="portfolio-entry__content">
            <Link to={`/portfolio/${entry.slug}`}>
                <h2 className="portfolio-entry__title">{entry.title}</h2>
            </Link>
            <h3 className="portfolio-entry__subtitle">{entry.subtitle}</h3>
            <p className="portfolio-entry__summary">{entry.summary}</p>
        </div>
    </div>;
}
