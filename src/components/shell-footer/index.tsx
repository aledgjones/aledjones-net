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
            <Icon className="footer__icon" path={mdiTwitter} color="#ffffff" size={36} />
            <Icon className="footer__icon" path={mdiLinkedin} color="#ffffff" size={36} />
            <Icon className="footer__icon" path={mdiGithubCircle} color="#ffffff" size={36} />
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
