import { Store, useStoreState } from "pullstate";

export enum LoadState {
    failed,
    loading,
    ready
}

export interface Image {
    id: string;
    url: string;
}

export interface BlogPostSummary {
    id: string;
    slug: string;
    date: string;
    title: string;
    summary: string;
    tags: string[];
    image: Image[];
    featured: boolean;
    avatar: Image[];
    author: string;
    readTime: number;
}

export interface BlogPost extends BlogPostSummary {
    content: string;
}

interface Blob {
    uniqueKey: string;
    description: string;
    x: number;
    y: number;
}

interface Screenshot {
    uniqueKey: string;
    blobs: Blob[];
    img: Image[];
}

export interface PortfolioPostSummary {
    id: string;
    slug: string;
    date: string;
    title: string;
    subtitle: string;
    thumb: Image[];
    summary: string;
    
    featured: boolean;
}

export interface PortfolioPost extends PortfolioPostSummary {
    url: string;
    displayUrl: string;
    screenshots: Screenshot[];
    technologies: {
        client: string[];
        server: string[];
    }
    brief: string;
    windowScreenshot: Image[];
    windowScreenshotDescription: string;
    content: string;
}

interface IStore {
    ui: {
        theme: string;
    }
    blog: {
        state: LoadState;
        posts: BlogPostSummary[]
    }
}

export const store = new Store<IStore>({
    ui: {
        theme: "#039BE5"
    },
    blog: {
        state: LoadState.loading,
        posts: []
    }
});

export function useStore<T>(getter: (s: IStore) => T) {
    return useStoreState(store, getter);
};