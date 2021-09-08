import React, {useEffect, useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { isValidWakandaAddresses } from "../../helpers/utils";
import { connectToMetaMask } from "../../helpers/metamask";
import { getItem, setItem } from "../../helpers/storage";
import { Redirect } from "react-router-dom";
import { wakandaData, wakandaHasErrors, wakandaLoading, wakandaError } from "../../redux/slices/wakandaSlice";
import { wakandaRegistration } from "../../redux/actions/wakandaActions";
import { connectAccount } from "../../redux/slices/connectedAccountSlice";
import Message from "../component/Message";
import { globalConstants } from "../../constants/global";

const RegistrationPage = (props) => {
    const dispatch = useDispatch();
    
    const web3Support = getItem(globalConstants.WEB3_SUPPORT);
    const connectedAccount = useSelector(state => state.connectedAccount.account);
    
    const registrationLoading = useSelector(wakandaLoading);
    const registrationHasErrors = useSelector(wakandaHasErrors);
    const registrationData = useSelector(wakandaData);
    const registrationError = useSelector(wakandaError);

    const [wakandaAddress, setWakandaAddress] = useState(connectedAccount);
    const [invalidAddress, setInvalidAddress] = useState(false);

    useEffect(()=>{
        const connect = async() => {
            const account = await connectToMetaMask();
            dispatch(connectAccount(account));
            setWakandaAddress(account);
        }
        connect()
    },[dispatch]);

    useEffect(()=>{
        if(web3Support){
            window.ethereum.on("accountsChanged", function (accounts) {
                dispatch(connectAccount(accounts[0]));
                setItem(globalConstants.META_MASK_ACCOUNT, accounts[0]);
                setWakandaAddress(accounts[0]);
            });
        }
    },[connectedAccount, web3Support, dispatch])

    useEffect(()=>{
        dispatch(connectAccount(wakandaAddress));
        setItem(globalConstants.META_MASK_ACCOUNT, wakandaAddress);
    },[wakandaAddress, dispatch]);

    function onWakandaAddressChange(e) {
        setInvalidAddress(false);
        const address = e.currentTarget.value;
        setWakandaAddress(address);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!isValidWakandaAddresses(wakandaAddress)) {
            setInvalidAddress(true);
        } else {
            dispatch(wakandaRegistration(wakandaAddress));
        }
    }

    if(!web3Support) {
        return <Message message={globalConstants.NOT_WEB3_BROWSER} />
    }

    if(registrationData.response || registrationData.reason === globalConstants.ALREADY_REGISTERED){
        return <Redirect to="/voting"/>
    }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="wakandaAddress">Registration page</Form.Label>
                    <Form.Control type="text" name="wakandaAddress" isInvalid={invalidAddress} value={wakandaAddress} required onChange={(e) => onWakandaAddressChange(e)} /> 
                    <Form.Control.Feedback type="invalid">
                        Invalid address
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Button variant="success" type="submit">
                        Register   
                    </Button>
                </Form.Group>
            </Form>
            {registrationLoading && <Message message={globalConstants.LOADING} />}
            {registrationHasErrors ? 
                <Message message={registrationError} /> 
                : 
                registrationData.reason && <Message message={registrationData.reason} />
            }
        </div>
    );
};

export default RegistrationPage;