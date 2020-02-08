import { useEffect } from 'react';

export function useStyle(cssRules: string) {

    useEffect(() => {
        const style = document.createElement("style");
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);
        const sheet: any = style.sheet;

        sheet.insertRule(cssRules);

        return () => {
            style.remove();
        }
    }, [cssRules]);

}