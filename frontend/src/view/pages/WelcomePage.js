import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Nav, Card } from "react-bootstrap";
import Registration from "../component/registration/Registration";
import Voting from "../component/voting/Voting";
import Message from "../component/Message";
import { globalConstants } from "../../constants/global";
import { getItem, setItem } from "../../helpers/storage";

const WelcomePage = () => {
    const dispatch = useDispatch();

    const connectedAccount = getItem(globalConstants.META_MASK_ACCOUNT);
    const web3Support = getItem(globalConstants.WEB3_SUPPORT);
    const [showRegistration, setShowRegistration] = useState(true);
    const [showVoting, setShowVoting] = useState(false);
    const [wakandaAddress, setWakandaAddress] = useState(connectedAccount);

    const onSelectNavigationHandler = (selectedKey) =>{
        if(selectedKey === "registration") {
            setShowVoting(false);
            setShowRegistration(true);
        } else if(selectedKey === "voting") {
            setShowRegistration(false);
            setShowVoting(true);
        } 
    }
    
    useEffect(()=>{
        if(web3Support){
            window.ethereum.on("accountsChanged", function (accounts) {
                setWakandaAddress(accounts[0]);
                setItem(globalConstants.META_MASK_ACCOUNT, accounts[0]);
            });
        }
    },[connectedAccount, web3Support, dispatch]);

    if(!web3Support) {
        return <Message data={{error : globalConstants.NOT_WEB3_BROWSER}} />
    }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <Nav variant="tabs" defaultActiveKey="registration" activeKey="/" onSelect={(selectedKey) => onSelectNavigationHandler(selectedKey)}>
                <Nav.Item>
                    <Nav.Link eventKey="registration">Registration</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="voting">Voting</Nav.Link>
                </Nav.Item>
            </Nav>
            <Card body bg="lisght">
                {`Welcome to the Kingdom of Wakanda voting`}
                <br />
                {`You are currently connected with address ${wakandaAddress}`}
            </Card>
            {showRegistration && <Registration />}
            {showVoting && <Voting />}
        </div>
    );
};

export default WelcomePage;