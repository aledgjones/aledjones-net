import { app } from "./flamelink";
import { store, LoadState } from ".";

export const loadPortfolioSummaries = async () => {
    store.update(s => {
        s.portfolio.state = LoadState.loading;
        s.portfolio.posts = [];
    });
    
    const posts = await app.content.get({
        schemaKey: 'portfolio',
        populate: ['thumb'],
        fields: ['id', 'slug', 'date', 'title', 'subtitle', 'thumb', 'summary', 'featured'],
        orderBy: { field: 'date', order: 'desc' },
        filters: [['publish', '==', true]]
    });

    if (posts === null) {
        store.update(s => {
            s.portfolio.state = LoadState.failed;
        });
    }
    else {
        store.update(s => {
            s.portfolio.state = LoadState.ready;
            if (posts) {
                s.portfolio.posts = Object.values(posts);
            }
        });
    }
};
