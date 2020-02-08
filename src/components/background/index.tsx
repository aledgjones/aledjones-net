import React, { useEffect, useState, useMemo } from 'react';

import './styles.css';

interface Point { x: number, y: number };
interface Box {
    x: number;
    y: number;
    scale: number;
    opacity: number;
}

interface Props {
    color: string;
}

const distance = (box: Box, mouse: Point) => {
    const a = Math.abs(mouse.x - box.x);
    const b = Math.abs(mouse.y - box.y);
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

export const Background: React.FC<Props> = ({ color }) => {

    const mouse = useMemo(() => {
        return { x: window.innerWidth / 3, y: 300 };
    }, []);

    // we create a blob for approx. every 9 px of width ~150 in total
    const [boxes, setBoxes] = useState<Box[]>(Array(Math.floor(window.innerWidth / 10)).fill({}).map(() => {
        const x = (Math.random() * (window.innerWidth + 100)) - 50;
        const y = (Math.random() * 700) - 50;
        return { x, y, opacity: 0, scale: 1, stagger: Math.random() };
    }));

    useEffect(() => {

        let iteration = 0;

        const interval = setInterval(() => {
            setBoxes(boxes => {
                const out = [];
                for (let i = 0; i < boxes.length; i++) {
                    const box = boxes[i];
                    const d = distance(box, mouse);
                    const opacity = (1 - (d / 500.0));
                    const scale = opacity * 2;
                    out[i] = {
                        x: box.x + (Math.sin(iteration / 50.0) * opacity),
                        y: box.y + (Math.sin(iteration / 60.0) * opacity),
                        opacity: opacity < 0.025 ? 0.025 : opacity,
                        scale: scale < 1 ? 1 : scale
                    }
                }
                return out;
            });
            iteration += 1;
        }, 1000 / 30);

        return () => {
            clearInterval(interval);
        }

    }, [mouse]);

    return <div className="background">
        <svg className="background__svg">
            {boxes.map((box, i) => <circle cx={box.x} cy={box.y} r="60" className="background__blob" key={i} style={{ transform: `scale(${box.scale})`, fill: color, opacity: box.opacity }} />)}
        </svg>
        <div className="background__scrim" />
    </div>;
}
