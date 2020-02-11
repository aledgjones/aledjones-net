import { useEffect, useState } from "react";
import { app } from "./flamelink";
import { PortfolioPost } from ".";

export const usePortfolioPost = (slug?: string) => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<PortfolioPost | null>(null);
    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setPost(null);
            const post = await app.content.getByField({
                schemaKey: 'portfolio',
                field: 'slug',
                value: slug,
                populate: true
            });
            if (post) {
                const values: PortfolioPost[] = Object.values(post);
                console.log(values[0]);
                setPost(values[0]);
            }
            setLoading(false);
        };
        run();
    }, [slug]);
    return { post, loading };
};
