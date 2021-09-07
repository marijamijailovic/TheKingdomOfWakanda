import React from "react";
import { Switch, Route } from "react-router-dom";

const AdminPage = React.lazy(() => import("../view/pages/AdminPage"));
const WelcomePage = React.lazy(() => import("../view/pages/WelcomePage"));
const RegistrationPage = React.lazy(() => import("../view/pages/RegistrationPage"));
const VotingPage = React.lazy(() =>import("../view/pages/VotingPage"));

const AppRouter = () => {
    return (
        <Switch>
            <Route 
                exact 
                path = "/admin"
                name = "AdminPage"
                render={(props) => <AdminPage {...props}/>} 
            />
            <Route 
                exact 
                path = "/voting"
                name = "VotingPage"
                render={(props) => <VotingPage {...props}/>}
            />
            <Route 
                exact 
                path = "/registration"
                name = "RegistrationPage"
                render={(props) => <RegistrationPage {...props}/>}
            />
            <Route 
                exact 
                path = "/"
                name = "WelcomePage"
                render={(props) => <WelcomePage {...props}/>} 
            />
        </Switch>
    )
}

export default AppRouter;