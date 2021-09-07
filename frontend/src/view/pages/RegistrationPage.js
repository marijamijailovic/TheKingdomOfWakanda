import React, {useEffect, useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { isValidWakandaAddresses } from "../../helpers/utils";
import { connectToMetaMask, metaMaskAccountChange } from "../../helpers/metamask";
import { getItem, setItem } from "../../helpers/storage";
import { Redirect } from "react-router-dom";
import { wakandaData, wakandaHasErrors, wakandaLoading, wakandaError } from "../../redux/wakandaSlice";
import { wakandaRegistration } from "../../redux/actions/wakandaActions";
import Message from "../component/Message";
import { globalConstants } from "../../constants/global";

const RegistrationPage = (props) => {
    const dispatch = useDispatch();
    const registrationLoading = useSelector(wakandaLoading);
    const registrationHasErrors = useSelector(wakandaHasErrors);
    const registrationData = useSelector(wakandaData);
    const registrationError = useSelector(wakandaError);
    const web3Support = getItem(globalConstants.WEB3_SUPPORT);
    const connectedAccount = getItem(globalConstants.META_MASK_ACCOUNT);
    const [account, setAccount] = useState(connectedAccount);
    const [wakandaAddress, setWakandaAddress] = useState(connectedAccount);
    const [invalidAddress, setInvalidAddress] = useState(false);

    useEffect(()=>{
        const connect = async() => {
            const acc = await connectToMetaMask();
            if(acc){
                setItem(globalConstants.META_MASK_ACCOUNT, acc);
                setAccount(acc);
            }
        }
        connect()
    },[]);

    useEffect(()=>{
        if(web3Support){
            metaMaskAccountChange();
            setAccount(getItem(globalConstants.META_MASK_ACCOUNT));
            setWakandaAddress(getItem(globalConstants.META_MASK_ACCOUNT));
        }
    },[account, web3Support])

    useEffect(()=>{
        setItem(globalConstants.META_MASK_ACCOUNT, wakandaAddress);
    },[wakandaAddress]);

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

    if(registrationData && registrationData.reason !== globalConstants.ALREADY_VOTED){
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
            {registrationLoading && <p>Loading...</p>}
            {registrationHasErrors ? <p>{registrationError}</p> : registrationData && <p>{registrationData.reason}</p>}
        </div>
    );
};

export default RegistrationPage;