import React, { useMemo } from 'react';
import Color from 'color';

import { Converter } from 'showdown';
import showdownHighlight from "showdown-highlight";

import { useStyle } from '../../ui/utils/style';
import { useStore } from '../../store';

import 'highlight.js/styles/vs2015.css';
import './styles.css';

interface Props {
    markdown: string;
}

export const MarkdownContent: React.FC<Props> = ({ markdown }) => {

    const theme = useStore(s => s.ui.theme);

    useStyle(`.markdown-content blockquote { border-left: 4px solid ${theme}; background-color: ${Color(theme).alpha(.1).toString()}; }`);
    useStyle(`.markdown-content a { color: ${theme}; }`);
    useStyle(`.markdown-content blockquote > p { color: ${theme}; }`);

    const html = useMemo(() => {
        const converter = new Converter({ extensions: [showdownHighlight], openLinksInNewWindow: true });
        return {
            __html: converter.makeHtml(markdown)
        };
    }, [markdown]);

    return <div className="markdown-content" dangerouslySetInnerHTML={html} />
}
