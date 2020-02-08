import React, { useEffect } from 'react';

import './styles.css';

export const Transition: React.FC = ({ children }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <div className="transition">
        {children}
    </div>
}
