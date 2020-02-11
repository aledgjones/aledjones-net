import { useEffect, useState } from "react";
import { app } from "./flamelink";
import { BlogPost } from ".";

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
                setPost(values[0]);
            }
            setLoading(false);
        };
        run();
    }, [slug]);
    return { post, loading };
};
