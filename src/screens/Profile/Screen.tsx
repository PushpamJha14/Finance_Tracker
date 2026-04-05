import React from 'react';
import { Screen } from '../../responsive/useIsDesktop';
import ProfileMobile from './Screen.mobile';
import ProfileDesktop from './Screen.desktop';

export default function ProfileScreen(props: any) {
    return (
        <Screen
            {...props}
            mobileComponent={ProfileMobile}
            desktopComponent={ProfileDesktop}
        />
    );
}
