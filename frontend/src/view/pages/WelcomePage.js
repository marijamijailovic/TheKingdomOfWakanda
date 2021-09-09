import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { changeRoute } from "../../helpers/utils";
import Message from "../component/Message";
import { globalConstants } from "../../constants/global";
import { getItem, setItem } from "../../helpers/storage";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

const WelcomePage = () => {
    const dispatch = useDispatch();

    const connectedAccount = getItem(globalConstants.META_MASK_ACCOUNT);
    const web3Support = getItem(globalConstants.WEB3_SUPPORT);
    const [isRegistrationPageVisible, setIsRegistrationPageVisible] = useState(false);

    const [wakadnaAddres, setWakandaAddress] = useState(connectedAccount);

    useEffect(()=>{
        if(web3Support){
            window.ethereum.on("accountsChanged", function (accounts) {
                setWakandaAddress(accounts[0]);
                setItem(globalConstants.META_MASK_ACCOUNT, accounts[0]);
            });
        }
    },[connectedAccount, web3Support, dispatch]);

    function cardClickHandler(page) {
        changeRoute(page);
        setIsRegistrationPageVisible(true);
    }

    if(!web3Support) {
        return <Message message={globalConstants.NOT_WEB3_BROWSER} />
    }

    if(isRegistrationPageVisible) {
        return <Redirect to="/registration"/>
    }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <h1>Welcome to the Kingdom of Wakanda voting</h1>
            <Card body className="welcome-card" bg="lisght" onClick={() => cardClickHandler("/registration")}>
                {`You are currently connected with address ${wakadnaAddres}, please click here to register for voting!`}
            </Card>
        </div>
    );
};

export default WelcomePage;