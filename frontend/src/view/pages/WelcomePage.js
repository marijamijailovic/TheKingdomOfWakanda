import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { changeRoute } from "../../helpers/utils";
import Message from "../component/Message";
import { connectToMetaMask, metaMaskAccountChange } from "../../helpers/metamask";
import { globalConstants } from "../../constants/global";
import { getItem, setItem } from "../../helpers/storage";
import { Redirect } from "react-router-dom";
import { connectAccount } from "../../redux/connectedAccountSlice";
import { useDispatch, useSelector } from "react-redux";

const WelcomePage = () => {
    const dispatch = useDispatch();
    const account = useSelector(state => state.connectedAccount.account);
    const web3Support = getItem(globalConstants.WEB3_SUPPORT);
    const [isRegistrationPageVisible, setIsRegistrationPageVisible] = useState(false);

    useEffect(()=>{
        const connect = async() => {
            const acc = await connectToMetaMask();
            if(acc){
                dispatch(connectAccount(acc));
                setItem(globalConstants.META_MASK_ACCOUNT, acc);
            }
        }
        connect()
    },[dispatch]);

    useEffect(()=>{
        if(web3Support){
            metaMaskAccountChange();
        }
    },[account,web3Support,dispatch])

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
            <Card body bg="lisght" onClick={() => cardClickHandler("/registration")}>
                {`Your Ethereum address is ${account}, please click here to register for voting!`}
            </Card>
        </div>
    );
};

export default WelcomePage;