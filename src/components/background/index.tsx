import React, { useEffect, useRef, CSSProperties } from 'react';
import { debounce } from 'lodash';
import { Event, InitMessage, ResizeMessage } from './event';

import myWorker from './background.worker';

import './styles.css';

interface Props {
    style?: CSSProperties;
    color: string;
    highlight: string;
}

export const Background: React.FC<Props> = ({ style, color, highlight }) => {

    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvas.current) {

            const offscreen = canvas.current.transferControlToOffscreen() as any;
            const worker = new myWorker() as Worker;

            const config: InitMessage = {
                type: Event.init,
                color,
                highlight,
                canvas: offscreen,
                width: window.innerWidth,
                height: 600
            };

            worker.postMessage(config, [offscreen]);

            const resize = debounce(() => {
                const config: ResizeMessage = {
                    type: Event.resize,
                    width: window.innerWidth,
                    height: 600
                }
                worker.postMessage(config);
            }, 1000 / 30);

            window.addEventListener('resize', resize);

            return () => {
                window.removeEventListener('resize', resize);
            }
        }
    }, [color, highlight, canvas]);

    return <div style={style} className="background">
        <canvas ref={canvas} />
        <div className="background__scrim" />
    </div>;
}
