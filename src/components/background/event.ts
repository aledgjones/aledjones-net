export interface InitMessage { type: Event.init, canvas: OffscreenCanvas, color: string, highlight: string, width: number, height: number };
export interface ResizeMessage { type: Event.resize, width: number, height: number };

export enum Event {
    init = 1,
    resize
}