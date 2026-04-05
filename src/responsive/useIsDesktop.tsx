import React, { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

const DESKTOP_BREAKPOINT = 900;

export const useIsDesktop = (overrideIsDesktop?: boolean): boolean => {
    const { width } = useWindowDimensions();

    if (overrideIsDesktop !== undefined) {
        return overrideIsDesktop;
    }

    return width >= DESKTOP_BREAKPOINT;
};

interface ScreenProps {
    isDesktop?: boolean;
    mobileComponent: React.ComponentType<any>;
    desktopComponent: React.ComponentType<any>;
    [key: string]: any;
}

/**
 * Screen wrapper that switches between mobile and desktop components
 * based on the responsive rule.
 */
export const Screen: React.FC<ScreenProps> = ({
    isDesktop: isDesktopProp,
    mobileComponent: MobileComponent,
    desktopComponent: DesktopComponent,
    ...props
}) => {
    const isDesktop = useIsDesktop(isDesktopProp);

    return isDesktop ? <DesktopComponent { ...props } /> : <MobileComponent { ...props } />;
};
