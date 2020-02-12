import React, { useMemo } from 'react';
import { mdiReact, mdiLanguageHtml5, mdiLanguageTypescript, mdiLanguageCss3, mdiLanguagePhp, mdiJquery, mdiDatabase, mdiAngularjs, mdiNodejs, mdiFirebase } from '@mdi/js';
import { Icon } from '../../ui';

import './styles.css';

interface Props {
    name: string;
}

export const Technology: React.FC<Props> = ({ name }) => {

    const icon = useMemo(() => {
        switch (name) {
            case 'HTML5':
                return mdiLanguageHtml5;
            case 'CSS3':
                return mdiLanguageCss3;
            case 'PHP':
                return mdiLanguagePhp;
            case 'jQuery':
                return mdiJquery;
            case 'mySQL':
                return mdiDatabase;
            case 'AngularJS':
                return mdiAngularjs;
            case 'React':
                return mdiReact;
            case 'NodeJS':
                return mdiNodejs;
            case 'Firebase':
                return mdiFirebase;
            case 'Typescript':
            default:
                return mdiLanguageTypescript;
        }
    }, [name]);

    return <div className="technology" key={name}>
        <Icon className="technology__icon" path={icon} size={36} color="#ffffff" />
        <span>{name}</span>
    </div>;
}
