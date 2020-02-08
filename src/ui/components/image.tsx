import React, { useEffect, FC, useState, useMemo } from 'react';

import { merge } from '../utils/merge';
import { Spinner } from './spinner';

import './image.css';

interface Props {
    id?: string;
    className?: string;
    color: string;
    src: string;
    x: number;
    y: number;
}

export const Image: FC<Props> = ({ id, className, color, src, x, y, children }) => {

    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {

        let ref: string;

        const run = async () => {
            setLoading(true);
            const resp = await fetch(src);
            const blob = await resp.blob();
            const ref = URL.createObjectURL(blob);
            setUrl(ref);
            setLoading(false);
        }

        run();

        return () => {
            URL.revokeObjectURL(ref);
        }

    }, [src]);

    const height = useMemo(() => {
        return `${(y / x) * 100}%`;
    }, [x, y]);

    return <div
        id={id}
        style={{ paddingBottom: height, backgroundColor: color }}
        className={merge('ui-image', className)}
    >
        {loading && <Spinner className="ui-image__spinner" color="#ffffff" size={24} />}
        {(!loading && url) && <div className="ui-image__canvas" style={{ backgroundImage: `url(${url})` }} />}
        {children}
    </div>
}