import React from "react";
import { Switch, Route } from "react-router-dom";

const AdminPage = React.lazy(() => import("../view/pages/AdminPage"));
const WelcomePage = React.lazy(() => import("../view/pages/WelcomePage"));
const NotFound = React.lazy(() => import("../view/pages/NotFound"));

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
                path = "/"
                name = "WelcomePage"
                render={(props) => <WelcomePage {...props}/>} 
            />
            <Route 
                path = "*"
                name = "NotFound"
                render={(props) => <NotFound {...props}/>}
            />
        </Switch>
    )
}

export default AppRouter;