import { useEffect, useState } from "react";
import { Store, useStoreState } from "pullstate";
import { app } from "./flamelink";
import { Converter } from 'showdown';
import showdownHighlight from "showdown-highlight";

export enum LoadState {
    failed,
    loading,
    ready
}

const converter = new Converter({ extensions: [showdownHighlight], openLinksInNewWindow: true });

export interface Image {
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

export const useTheme = (color: string) => {
    useEffect(() => {
        store.update(s => {
            s.ui.theme = color
        });
    }, [color]);
}

export const loadPostSummaries = async () => {

    store.update(s => {
        s.blog.state = LoadState.loading;
        s.blog.posts = [];
    });

    const posts = await app.content.get({
        schemaKey: 'blogPost',
        populate: ['image', 'avatar'],
        fields: ['id', 'slug', 'date', 'title', 'summary', 'tags', 'image', 'featured', 'readTime', 'avatar', 'author'],
        orderBy: { field: 'date', order: 'desc' },
        filters: [['publish', '==', true]],
        limit: 10
    });

    if (posts === null) {
        store.update(s => {
            s.blog.state = LoadState.failed;
        });
    } else {
        store.update(s => {
            s.blog.state = LoadState.ready;
            if (posts) {
                s.blog.posts = Object.values(posts);
            }
        });
    }

};

export const useBlogPost = (slug?: string) => {

    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setPost(null);
            const post = await app.content.getByField({
                schemaKey: 'blogPost',
                field: 'slug',
                value: slug,
                populate: true
            });
            if (post) {
                const values: BlogPost[] = Object.values(post);
                const html = converter.makeHtml(values[0].content);
                setPost({
                    ...values[0],
                    content: html
                });
            }
            setLoading(false);
        }
        run();
    }, [slug]);

    return { post, loading };
};