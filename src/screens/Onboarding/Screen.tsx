import React from 'react';
import { Screen } from '../../responsive/useIsDesktop';
import OnboardingMobile from './Screen.mobile';
import OnboardingDesktop from './Screen.desktop';

export default function OnboardingScreen(props: any) {
    return (
        <Screen
            {...props}
            mobileComponent={OnboardingMobile}
            desktopComponent={OnboardingDesktop}
        />
    );
}
