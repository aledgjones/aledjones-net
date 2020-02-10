import React, { useEffect, useRef, CSSProperties } from 'react';
import { debounce } from 'lodash';
import { Event } from './event';

import myWorker from './background.worker';

import './styles.css';

interface Props {
    style?: CSSProperties;
    color: string;
}

export const Background: React.FC<Props> = ({ style, color }) => {

    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvas.current) {

            const offscreen = canvas.current.transferControlToOffscreen() as any;
            const worker = new myWorker() as Worker;

            worker.postMessage({
                type: Event.init,
                color,
                canvas: offscreen,
                width: window.innerWidth,
                height: 600
            }, [offscreen]);

            const resize = debounce(() => {
                worker.postMessage({
                    type: Event.resize,
                    width: window.innerWidth,
                    height: 600
                });
            }, 1000 / 30);

            window.addEventListener('resize', resize);

            return () => {
                window.removeEventListener('resize', resize);
            }
        }
    }, [color, canvas]);

    return <div style={style} className="background">
        <canvas ref={canvas} />
        <div className="background__scrim" />
    </div>;
}
