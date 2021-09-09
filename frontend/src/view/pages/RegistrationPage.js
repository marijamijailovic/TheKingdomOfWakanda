import React, {useEffect, useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { isValidWakandaAddresses, changeRoute } from "../../helpers/utils";
import { isEmpty } from "underscore";
import { getItem, setItem } from "../../helpers/storage";
import { Redirect } from "react-router-dom";
import { registration } from "../../redux/slices/wakandaSlice";
import { wakandaRegistration } from "../../redux/thunks/wakandaThunks";
import Message from "../component/Message";
import { globalConstants } from "../../constants/global";

const RegistrationPage = (props) => {
    const dispatch = useDispatch();
    
    const connectedAccount = getItem(globalConstants.META_MASK_ACCOUNT);
    const web3Support = getItem(globalConstants.WEB3_SUPPORT);
    //const connectedAccount = useSelector(state => state.connectedAccount.account);
    
    const registrationData = useSelector(registration);
    
    const [wakandaAddress, setWakandaAddress] = useState(connectedAccount);
    const [invalidAddress, setInvalidAddress] = useState(false);
    const [isVotingPageVisible, setIsVotingPageVisible] = useState(false);

    // useEffect(()=>{
    //     const connect = async() => {
    //         const account = await connectToMetaMask();
    //         dispatch(connectAccount(account));
    //         setWakandaAddress(account);
    //     }
    //     connect()
    // },[dispatch]);

    useEffect(()=>{
        if(web3Support){
            window.ethereum.on("accountsChanged", function (accounts) {
                //dispatch(connectAccount(accounts[0]));
                setItem(globalConstants.META_MASK_ACCOUNT, accounts[0]);
                setWakandaAddress(accounts[0]);
            });
        }
    },[connectedAccount, web3Support, dispatch])

    useEffect(()=>{
        //dispatch(connectAccount(wakandaAddress));
        setItem(globalConstants.META_MASK_ACCOUNT, wakandaAddress);
    },[wakandaAddress, dispatch]);

    function onWakandaAddressChange(e) {
        setInvalidAddress(false);
        const address = e.currentTarget.value;
        setWakandaAddress(address);
    }

    function handleSubmitWakandaRegistration(event) {
        event.preventDefault();
        if(!isValidWakandaAddresses(wakandaAddress)) {
            setInvalidAddress(true);
        } else {
            dispatch(wakandaRegistration(wakandaAddress));
        }
    }

    const onRedirectToVotingHandler = (page) => {
        changeRoute(page);
        setIsVotingPageVisible(true);
    }

    if(!web3Support) {
        return <Message message={globalConstants.NOT_WEB3_BROWSER} />
    }

    if(isVotingPageVisible) {
        return <Redirect to="/voting"/>
    }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <h1>Registration Page</h1>
            <h3>If registration succeed, we will send you 1 WKND token that you could use for voting</h3>
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="wakandaAddress">Input your address</Form.Label>
                    <Form.Control type="text" name="wakandaAddress" isInvalid={invalidAddress} value={wakandaAddress} required onChange={(e) => onWakandaAddressChange(e)} /> 
                    <Form.Control.Feedback type="invalid">
                        Invalid address
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Button variant="success" type="submit" name="registration" onClick={handleSubmitWakandaRegistration}>
                        Register   
                    </Button>
                </Form.Group>
            </Form>
            {!isEmpty(registrationData) && 
                (
                (registrationData.error && <Message message={registrationData.error}/>)  ||
                (registrationData.reason && <Message message={registrationData.reason}/>) ||
                (registrationData.response && 
                    <div>
                        <Message message={registrationData.response.transactionHash}/>
                        <Button onClick={() => onRedirectToVotingHandler("/voting")}>Go to voting page</Button>
                    </div>
                )
                )
            }
        </div>
    );
};

export default RegistrationPage;