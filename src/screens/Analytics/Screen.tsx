import React from 'react';
import { Screen } from '../../responsive/useIsDesktop';
import AnalyticsMobile from './Screen.mobile';
import AnalyticsDesktop from './Screen.desktop';

export default function AnalyticsScreen(props: any) {
    return (
        <Screen
            {...props}
            mobileComponent={AnalyticsMobile}
            desktopComponent={AnalyticsDesktop}
        />
    );
}
