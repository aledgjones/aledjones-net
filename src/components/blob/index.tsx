import React from 'react';

import './styles.css';

interface Props {
    x: number;
    y: number;
    label: string;
}

export const Blob: React.FC<Props> = ({ x, y, label }) => {
    return <div style={{ left: `${x}%`, top: `${y}%` }} className="blob">
        <div className="blob__circle" />
        <div className="blob__pulse" />
        <div className="blob__label">{label}</div>
    </div>
}
