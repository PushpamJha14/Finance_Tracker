import React from 'react';
import { Screen } from '../../responsive/useIsDesktop';
import AddExpenseMobile from './Screen.mobile';
import AddExpenseDesktop from './Screen.desktop';

export default function AddExpenseScreen(props: any) {
    return (
        <Screen
            {...props}
            mobileComponent={AddExpenseMobile}
            desktopComponent={AddExpenseDesktop}
        />
    );
}
