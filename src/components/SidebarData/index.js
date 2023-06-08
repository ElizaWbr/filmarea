import { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import Icon from '@mdi/react';
import { mdiHome, mdiStar } from '@mdi/js';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <Icon path={mdiHome} size={1} />,
        cName: 'sidebar_text'
    },
    {
        title: 'Favoritos',
        path: '/favorites',
        icon: <Icon path={mdiStar} size={1} />,
        cName: 'sidebar_text'
    },
]
