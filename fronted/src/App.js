import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import './styles/main.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const WelcomePage = React.lazy(() => import("./view/pages/WelcomePage"));
const RegistrationPage = React.lazy(() => import("./view/pages/RegistrationPage"));
const VotingPage = React.lazy(() =>import('./view/pages/VotingPage'));

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route 
            exact 
            path = "/voting"
            component={VotingPage} />
          <Route 
            exact 
            path = "/registration"
            component={RegistrationPage} />
          <Route 
            exact 
            path = "/"
            component={WelcomePage}/>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
