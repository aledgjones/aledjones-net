import Color from "color";
import shortid from "shortid";
import { Event, InitMessage, ResizeMessage } from "./event";

interface Point { key: string, x: number, y: number, dx: number, dy: number, stagger: number, links: string[], pulse: number };
interface Points { [key: string]: Point };

class Renderer {

    private ctx = this.canvas.getContext('2d');

    private order: string[] = [];
    private points: Points = {};

    private linkColor = Color(this.color).alpha(.1).toString();
    private linkHighlight = Color(this.highlight).alpha(.4).toString();

    constructor(private canvas: OffscreenCanvas, private color: string, private highlight: string) {
        this.movementLoop();
        this.pulseLoop();
        this.renderLoop();
    }

    private point(key: string) {
        return this.points[key];
    }

    private distance(one: { x: number, y: number }, two: { x: number, y: number }) {
        const a = Math.abs(two.x - one.x);
        const b = Math.abs(two.y - one.y);
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }

    private calcLinks(origin: Point) {

        const count = 10;

        const links: string[] = [];
        const distances: [string, number][] = this.order.map(key => {
            const point = this.point(key);
            return [point.key, this.distance(point, origin)];
        });
        const sorted = distances.sort((a, b) => a[1] - b[1]);

        for (let i = 1; i <= count; i++) {
            const [key] = sorted[i];
            const point = this.point(key);
            if (!point.links.includes(origin.key)) {
                links.push(key);
            }
        }

        return links;

    }

    private movementLoop() {
        let x = 0;
        setInterval(() => {
            for (let i = 0; i < this.order.length; i++) {
                const point = this.point(this.order[i]);
                point.pulse = point.pulse - 0.01 < 0 ? 0 : point.pulse - 0.02;
                point.dx = point.x + Math.sin(0.01 * x) * (50 * point.stagger);
                point.dy = point.y + Math.sin(0.02 * x) * (30 * point.stagger);
            }
            x++;
        }, 1000 / 30);
    }

    private pulseLoop() {
        setTimeout(() => {
            const x = (this.canvas.width * .5) + (Math.random() * 400) - 200;
            const y = (this.canvas.height * .5) + (Math.random() * 50) - 25;
            for (let i = 0; i < this.order.length; i++) {
                const point = this.point(this.order[i]);
                const distance = this.distance(point, { x, y });
                if (distance < 50) {
                    point.pulse = 1.0;
                }
            }
            this.pulseLoop();
        }, Math.random() * 500);
    }

    private renderLoop() {
        if (this.ctx) {

            this.ctx.globalAlpha = 1.0;

            this.ctx.fillStyle = 'rgb(20,20,20)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            // BACKGROUND

            this.ctx.fillStyle = this.color;
            for (let i = 0; i < this.order.length; i++) {
                const point = this.point(this.order[i]);
                this.ctx.beginPath();
                this.ctx.arc(point.dx, point.dy, 2, 0, Math.PI * 2);
                this.ctx.closePath();
                this.ctx.fill();
            }

            this.ctx.beginPath();
            for (let i = 0; i < this.order.length; i++) {
                const point = this.point(this.order[i]);
                for (let ii = 0; ii < point.links.length; ii++) {
                    const link = this.point(point.links[ii]);
                    this.ctx.strokeStyle = this.linkColor;
                    this.ctx.moveTo(point.dx, point.dy);
                    this.ctx.lineTo(link.dx, link.dy);
                }
            }
            this.ctx.stroke();

            // HIGHLIGHT

            this.ctx.fillStyle = this.highlight;
            for (let i = 0; i < this.order.length; i++) {
                const point = this.point(this.order[i]);
                this.ctx.globalAlpha = point.pulse;
                if (point.pulse > 0) {
                    this.ctx.beginPath();
                    this.ctx.arc(point.dx, point.dy, 2, 0, Math.PI * 2);
                    this.ctx.closePath();
                    this.ctx.fill();
                }
            }

            for (let i = 0; i < this.order.length; i++) {
                const point = this.point(this.order[i]);
                if (point.pulse > 0) {
                    this.ctx.globalAlpha = point.pulse;

                    this.ctx.beginPath();
                    for (let ii = 0; ii < point.links.length; ii++) {
                        const link = this.point(point.links[ii]);
                        this.ctx.strokeStyle = this.linkHighlight;
                        this.ctx.moveTo(point.dx, point.dy);
                        this.ctx.lineTo(link.dx, link.dy);
                    }
                    this.ctx.stroke();
                }
            }

        }

        requestAnimationFrame(() => this.renderLoop());
    }

    public size(width: number, height: number) {

        const count = width / 1.5;

        this.order = [];
        this.points = {};

        this.canvas.height = height;
        this.canvas.width = width;

        for (let i = 0; i <= count; i++) {
            const key = shortid();
            const stagger = Math.random();
            this.order.push(key);
            this.points[key] = {
                key,
                x: (Math.random() * (width + 100)) - 50,
                y: (Math.random() * (height + 100)) - 50,
                dx: 0,
                dy: 0,
                stagger,
                links: [],
                pulse: 0
            }

        }

        for (let i = 0; i < this.order.length; i++) {
            const point = this.point(this.order[i]);
            point.links = this.calcLinks(point);
        }
    }
}

let renderer: Renderer;

self.addEventListener('message', e => {
    if (e.data.type === Event.init) {
        const { canvas, color, highlight, width, height } = e.data as InitMessage;
        renderer = new Renderer(canvas, color, highlight);
        renderer.size(width, height);
    }
    if (e.data.type === Event.resize) {
        const { width, height } = e.data as ResizeMessage;
        renderer.size(width, height);
    }
});

export default null as any;