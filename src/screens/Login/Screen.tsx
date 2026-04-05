import React from 'react';
import { Screen } from '../../responsive/useIsDesktop';
import LoginMobile from './Screen.mobile';
import LoginDesktop from './Screen.desktop';

export default function LoginScreen(props: any) {
    return (
        <Screen
            {...props}
            mobileComponent={LoginMobile}
            desktopComponent={LoginDesktop}
        />
    );
}
