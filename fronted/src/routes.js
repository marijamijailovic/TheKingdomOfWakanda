import React from "react";

const WelcomePage = React.lazy(() => import('./view/pages/WelcomePage'));
const RegistrationPage = React.lazy(() => import('./view/pages/RegistrationPage'));
const VotingPage = React.lazy(() =>import('./view/pages/VotingPage'));

export function getRoutes() {
    let routes = [
        {
            path: '/',
            exact: true,
            name: 'WelcomePage',
            component: WelcomePage
        },
        {
            path: '/registration',
            exact: true,
            name: 'RegistrationPage',
            component: RegistrationPage
        },
        {
            path: 'voting',
            exact: true,
            name: 'VotingPage',
            component: VotingPage
        }
    ];
    return routes;
}