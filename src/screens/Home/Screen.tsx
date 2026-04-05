import React from 'react';
import { Screen } from '../../responsive/useIsDesktop';
import HomeMobile from './Screen.mobile';
import HomeDesktop from './Screen.desktop';

export default function HomeScreen(props: any) {
    return (
        <Screen
            {...props}
            mobileComponent={HomeMobile}
            desktopComponent={HomeDesktop}
        />
    );
}
