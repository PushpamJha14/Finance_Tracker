import React from 'react';
import { Screen } from '../../responsive/useIsDesktop';
import SignupMobile from './Screen.mobile';
import SignupDesktop from './Screen.desktop';

export default function SignupScreen(props: any) {
    return (
        <Screen
            {...props}
            mobileComponent={SignupMobile}
            desktopComponent={SignupDesktop}
        />
    );
}
