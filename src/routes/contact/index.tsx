import React from 'react';
import { Header } from '../../components/header';
import { Transition } from '../../components/transition';

import './styles.css';

export const Contact: React.FC = () => {
    return <Transition>
        <Header title="Get in touch" subtitle="Let's discuss our next project" />
    </Transition>
}
