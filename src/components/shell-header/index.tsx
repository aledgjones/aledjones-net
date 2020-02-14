import React from 'react';
import { Link } from 'react-router-dom';
import { mdiHomeOutline } from '@mdi/js';

import { Icon } from '../../ui';

import './styles.css';

export const ShellHeader: React.FC = () => {

    return <div className="shell__header-container">
        <header className="shell__header center-block">

            <Link to="/" className="shell__hide-big">
                <Icon path={mdiHomeOutline} color="#ffffff" size={24} />
            </Link>

            <Link to="/" className="shell__nav-item shell__hide-small">
                <span>aledjones</span>
                <span className="shell__nav-item--faded">.net</span>
            </Link>
            <nav>
                <div className="shell__nav">
                    <Link to="/portfolio" className="shell__nav-item">Portfolio</Link>
                    <Link to="/blog" className="shell__nav-item">Blog</Link>
                </div>
            </nav>
        </header>
    </div>

}
