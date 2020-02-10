import Color from "color";
import shortid from "shortid";
import { Event } from "./event";

interface Point { key: string, x: number, y: number, dx: number, dy: number, stagger: number, links: string[] };
interface Points { [key: string]: Point };
interface MessageProps { type: Event, canvas: OffscreenCanvas, color: string, width: number, height: number };

class Renderer {

    private ctx = this.canvas.getContext('2d');

    private order: string[] = [];
    private points: Points = {};

    private linkColor = Color(this.color).alpha(.1).toString();

    constructor(private canvas: OffscreenCanvas, private color: string) {
        this.tick();
        this.renderLoop();
    }

    private point(key: string) {
        return this.points[key];
    }

    private distance(one: Point, two: Point) {
        const a = Math.abs(two.x - one.x);
        const b = Math.abs(two.y - one.y);
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }

    private calcLinks(origin: Point) {

        const links: string[] = [];
        const distances: [string, number][] = this.order.map(key => {
            const point = this.point(key);
            return [point.key, this.distance(point, origin)];
        });
        const sorted = distances.sort((a, b) => a[1] - b[1]);

        for (let i = 1; i <= 8; i++) {
            const [key] = sorted[i];
            const point = this.point(key);
            if (!point.links.includes(origin.key)) {
                links.push(key);
            }
        }

        return links;

    }

    private tick() {
        let x = 0;
        setInterval(() => {
            for (let i = 0; i < this.order.length; i++) {
                const point = this.point(this.order[i]);
                point.dx = point.x + Math.sin(0.01 * x) * (50 * point.stagger);
                point.dy = point.y + Math.sin(0.02 * x) * (30 * point.stagger);
            }
            x++;
        }, 1000 / 30);
    }

    private renderLoop() {
        if (this.ctx) {
            this.ctx.fillStyle = 'rgb(20,20,20)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            for (let i = 0; i < this.order.length; i++) {
                const point = this.point(this.order[i]);
                this.ctx.fillStyle = this.color;
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
                links: []
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
        const { canvas, color, width, height } = e.data as MessageProps;
        renderer = new Renderer(canvas, color);
        renderer.size(width, height);
    }
    if (e.data.type === Event.resize) {
        const { width, height } = e.data as MessageProps;
        renderer.size(width, height);
    }
});

export default null as any;