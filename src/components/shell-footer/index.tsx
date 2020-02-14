import React, { useMemo } from 'react';
import { mdiGithubCircle, mdiLinkedin, mdiTwitter } from '@mdi/js';
import { Icon } from '../../ui';

import './styles.css';

export const ShellFooter: React.FC = () => {

    const copyright = useMemo(() => {
        return `2017 - ${new Date().getFullYear()}`;
    }, []);

    return <footer className="footer center-block">
        <div className="footer__social">
            <a href="https://twitter.com/aledjones" target="_blank" rel="noopener noreferrer">
                <Icon className="footer__icon" path={mdiTwitter} color="#ffffff" size={36} />
            </a>
            <a href="https://www.linkedin.com/in/aledgjones/" target="_blank" rel="noopener noreferrer">
                <Icon className="footer__icon" path={mdiLinkedin} color="#ffffff" size={36} />
            </a>
            <a href="https://github.com/aledgjones" target="_blank" rel="noopener noreferrer">
                <Icon className="footer__icon" path={mdiGithubCircle} color="#ffffff" size={36} />
            </a>
        </div>
        <div className="footer__center">
            <p className="footer__spacer">
                <span className="footer__highlight">aledjones</span>
                <span>.net</span>
            </p>
            <p>Copyright &copy; Aled Jones {copyright}</p>
        </div>
    </footer>
}
