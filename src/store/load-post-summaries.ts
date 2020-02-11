import { app } from "./flamelink";
import { store, LoadState } from ".";
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
    }
    else {
        store.update(s => {
            s.blog.state = LoadState.ready;
            if (posts) {
                s.blog.posts = Object.values(posts);
            }
        });
    }
};
