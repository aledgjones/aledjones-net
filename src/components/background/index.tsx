import React, { useEffect, useState, useMemo } from 'react';
import shortid from 'shortid';
import Color from 'color';

import './styles.css';

interface Point { key: string, x: number, y: number, stagger: number, links: string[] };
interface Points { [key: string]: Point };

interface Props {
    color: string;
}

const distance = (one: Point, two: Point) => {
    const a = Math.abs(two.x - one.x);
    const b = Math.abs(two.y - one.y);
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

const links = (origin: Point, order: string[], points: Points) => {

    const links: string[] = [];
    const distances: [string, number][] = order.map(key => {
        const point = points[key];
        return [point.key, distance(point, origin)];
    });
    const sorted = distances.sort((a, b) => a[1] - b[1]);

    for (let i = 1; i <= 5; i++) {
        const [key] = sorted[i];
        const point = points[key];
        if (!point.links.includes(origin.key)) {
            links.push(key);
        }
    }

    return links;
}

const usePoints = (count: number) => {

    return useMemo(() => {

        const order: string[] = [];
        const points: Points = {};

        for (let i = 0; i <= count; i++) {
            const key = shortid();
            order.push(key);
            points[key] = {
                key,
                x: (Math.random() * (window.innerWidth + 100)) - 50,
                y: (Math.random() * 700) - 50,
                stagger: Math.random(),
                links: []
            }

        }

        for (let i = 0; i < order.length; i++) {
            const point = points[order[i]];
            point.links = links(point, order, points);
        }

        return { points, order };

    }, [count]);

}

export const Background: React.FC<Props> = ({ color }) => {

    const [itr, setItr] = useState(0);
    const { points, order } = usePoints(window.innerWidth / 5);

    useEffect(() => {
        const interval = setInterval(() => {
            setItr(s => s + 1);
        }, 1000 / 30);

        return () => {
            clearInterval(interval);
        }
    }, []);

    const edge = useMemo(() => {
        return Color(color).alpha(.1).toString();
    }, [color]);

    return <div className="background">
        <svg className="background__svg">
            {order.map(key => {
                const point = points[key];
                const pointX = point.x + ((Math.sin(itr / 50.0) * point.stagger * 75));
                const pointY = point.y + ((Math.sin(itr / 60.0) * point.stagger * 75));
                return <>
                    <circle
                        key={point.key}
                        className="background__blob"
                        style={{ fill: color, opacity: point.stagger }}
                        cx={pointX}
                        cy={pointY}
                        r="2"
                    />
                    {point.links.map(linkKey => {
                        const link = points[linkKey];
                        const linkX = link.x + ((Math.sin(itr / 50.0) * link.stagger * 75));
                        const linkY = link.y + ((Math.sin(itr / 60.0) * link.stagger * 75));
                        return <line x1={pointX} y1={pointY} x2={linkX} y2={linkY} stroke={edge} />
                    })}
                </>;
            })}
        </svg>
        <div className="background__scrim" />
    </div>;
}
