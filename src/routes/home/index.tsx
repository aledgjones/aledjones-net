import React from 'react';

import { Header } from '../../components/header';
import { Transition } from '../../components/transition';

import './styles.css';

export const Home: React.FC = () => {
    return <Transition>
        <Header title="Aled Jones" subtitle="Front End Web Developer" />
    </Transition>
}
