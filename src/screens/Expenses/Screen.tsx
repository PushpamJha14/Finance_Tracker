import React from 'react';
import { Screen } from '../../responsive/useIsDesktop';
import ExpensesMobile from './Screen.mobile';
import ExpensesDesktop from './Screen.desktop';

export default function ExpensesScreen(props: any) {
    return (
        <Screen
            {...props}
            mobileComponent={ExpensesMobile}
            desktopComponent={ExpensesDesktop}
        />
    );
}
