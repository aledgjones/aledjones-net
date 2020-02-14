import React from 'react';
import { merge } from '../../ui/utils/merge';

import './styles.css';

interface Props {
    className?: string;
    skill: string;
    level: number;
    color: string;
}

export const Skill: React.FC<Props> = ({ className, skill, level, color }) => {

    const max = 7;

    return <div className={merge("skill", className)}>
        <span className="skill__label">{skill}</span>
        <div className="skill__blobs">
            {Array(level).fill('').map(i => <div key={i} style={{ backgroundColor: color }} className="skill__blob skill__blob--yes" />)}
            {Array(max - level).fill('').map(i => <div key={i} className="skill__blob skill__blob--no" />)}
        </div>
    </div>
}
