import React from 'react';

import './styles.css';

interface Props {
    title?: string;
    subtitle?: string;
}

export const Header: React.FC<Props> = ({ title, subtitle, children }) => {
    return <div className="header center-block">
        <h1 className="header__title">{title}</h1>
        <h2 className="header__subtitle">{subtitle}</h2>
        {children}
    </div>
}
