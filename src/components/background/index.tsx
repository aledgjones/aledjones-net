import React, { useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { Event } from './event';

import myWorker from './background.worker';

import './styles.css';

interface Props {
    color: string;
}

export const Background: React.FC<Props> = ({ color }) => {

    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvas.current) {

            const offscreen = canvas.current.transferControlToOffscreen() as any;
            const worker = new myWorker() as Worker;

            worker.postMessage({
                type: Event.init,
                color,
                canvas: offscreen,
                width: window.innerWidth * devicePixelRatio,
                height: 600 * devicePixelRatio
            }, [offscreen]);

            const resize = throttle(() => {
                worker.postMessage({
                    type: Event.resize,
                    width: window.innerWidth * devicePixelRatio,
                    height: 600 * devicePixelRatio
                });
            }, 1000 / 30);

            window.addEventListener('resize', resize);

            return () => {
                window.removeEventListener('resize', resize);
            }
        }
    }, [color, canvas]);

    return <div className="background">
        <canvas ref={canvas} />
        <div className="background__scrim" />
    </div>;
}
