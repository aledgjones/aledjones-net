import React, { useEffect } from 'react';

import './styles.css';
import { merge } from '../../ui/utils/merge';

interface Props {
    className?: string;
}

export const Transition: React.FC<Props> = ({ className, children }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <div className={merge("transition", className)}>
        {children}
    </div>
}
