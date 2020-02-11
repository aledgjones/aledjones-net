import React from 'react';
import { Technology } from '../technology';

import './styles.css';

interface Props {
    type: 'server' | 'client';
    names: string[];
}

export const Technologies: React.FC<Props> = ({ type, names }) => {
    return <div className="technologies">
        {names.map(name => {
            return <Technology key={name} name={name} />;
        })}
        <div className="technologies__label">{type}</div>
    </div>;
}
