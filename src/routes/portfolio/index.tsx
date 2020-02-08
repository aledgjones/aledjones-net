import React from 'react';

import { Header } from '../../components/header';
import { Transition } from '../../components/transition';

import './styles.css';

export const Portfolio: React.FC = () => {
    return <Transition>
        <Header title="Portfolio" subtitle="Recent Commissions &amp; Projects" />
    </Transition>;
}
