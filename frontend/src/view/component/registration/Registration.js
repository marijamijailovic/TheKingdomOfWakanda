import React, {useEffect, useState} from "react";
import { Form, Button } from "react-bootstrap";
import { isValidWakandaAddresses } from "../../../helpers/utils";
import { isEmpty } from "underscore";
import { getItem, setItem } from "../../../helpers/storage";
import { globalConstants } from "../../../constants/global";
import { useDispatch, useSelector } from "react-redux";
import { registration, updateState } from "../../../redux/slices/wakandaSlice";
import { wakandaRegistration } from "../../../redux/thunks/wakandaThunks";
import Message from "../Message";

const RegistrationPage = (props) => {
    const dispatch = useDispatch();
    
    const connectedAccount = getItem(globalConstants.META_MASK_ACCOUNT);
    const web3Support = getItem(globalConstants.WEB3_SUPPORT);
    
    const registrationData = useSelector(registration);
    
    const [wakandaAddress, setWakandaAddress] = useState(connectedAccount);
    const [invalidAddress, setInvalidAddress] = useState(false);

    useEffect(()=>{
        if(web3Support){
            window.ethereum.on("accountsChanged", function (accounts) {
                setItem(globalConstants.META_MASK_ACCOUNT, accounts[0]);
                setWakandaAddress(accounts[0]);
                dispatch(updateState());
            });
        }
    },[connectedAccount, web3Support, dispatch])

    useEffect(()=>{
        setItem(globalConstants.META_MASK_ACCOUNT, wakandaAddress);
    },[wakandaAddress, dispatch]);

    function onWakandaAddressChange(e) {
        setInvalidAddress(false);
        const address = e.currentTarget.value;
        setWakandaAddress(address);
        dispatch(updateState());
    }

    function handleSubmitWakandaRegistration(event) {
        event.preventDefault();
        if(!isValidWakandaAddresses(wakandaAddress)) {
            setInvalidAddress(true);
        } else {
            dispatch(wakandaRegistration(wakandaAddress));
        }
    }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <div className = "notice">
                If you want to vote, please fill the form bellow,
                and 1 WKND token for voting will be sent to the inputted address!
            </div>
            <Form className="c-wakanda-form">
                <Form.Group>
                    <Form.Label htmlFor="wakandaAddress">Input your address</Form.Label>
                    <Form.Control type="text" name="wakandaAddress" isInvalid={invalidAddress} value={wakandaAddress} required onChange={(e) => onWakandaAddressChange(e)} /> 
                    <Form.Control.Feedback type="invalid">
                        Invalid address
                    </Form.Control.Feedback>
                    <Button variant="success" type="submit" name="registration" onClick={handleSubmitWakandaRegistration}>
                        Register   
                    </Button>
                </Form.Group>
                {!isEmpty(registrationData) && <Message data={registrationData} />}
            </Form>
        </div>
    );
};

export default RegistrationPage;