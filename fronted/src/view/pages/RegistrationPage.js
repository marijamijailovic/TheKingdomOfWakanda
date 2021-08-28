import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerWakanda } from "../../actions";
import { Redirect } from "react-router-dom";
import { isEmpty, isValidWakandaAddresses } from "../../helpers/utils";

const RegistrationPage = () => {
    const dispatch = useDispatch();
    const { wakandaRegister, data, error } = useSelector((state) => state.wakandaReducer);
    const [wakandaAddress, setWakandaAddress] = useState("");
    const [invalidAddress, setInvalidAddress] = useState(false);
    
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
            dispatch(registerWakanda(wakandaAddress));
        }
    }

    if(wakandaRegister){
        return <Redirect to="/voting" />
    }

    return (
        <>
        <div className = "c-app c-default-layout flex-row align-items-center">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="area">Registration page</Form.Label>
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
        </div>
        {!isEmpty(error) ? error : ""}
        {data && data.reason ? data.reason : ""}
        </>
    );
};

export default RegistrationPage;