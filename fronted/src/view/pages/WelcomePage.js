import React, {useState} from "react";
import { Card } from "react-bootstrap";
import { changeRoute } from "../../helpers/utils";
import { Redirect } from "react-router-dom";

const WelcomePage = () => {
    const [isRegistrationPageVisible, setIsRegistrationPageVisible] = useState(false);

    function cardClickHandler(page) {
        changeRoute(page);
        setIsRegistrationPageVisible(true);
    }

    if(isRegistrationPageVisible) {
        return <Redirect to="/registration" />
    }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <h1>Welcome to the Kingdom of Wakanda voting</h1>
            <Card body bg="lisght" onClick={() => cardClickHandler("/registration")}>
                Please click here to register
            </Card>
        </div>
    );
};

export default WelcomePage;