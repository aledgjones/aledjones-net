import React, { useEffect, useState } from 'react';
import { getTweet } from './get-tweet';

interface Props {
    username: string;
}

export const Tweet: React.FC<Props> = ({ username }) => {

    const [tweet, setTweet] = useState();

    useEffect(() => {
        const run = async () => {
            const data = await getTweet(username);
            setTweet(data);
        }
        run();
    }, [username]);

    return <>
        
    </>
}
