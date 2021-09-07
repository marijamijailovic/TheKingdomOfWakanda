import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { isValidWakandaAddresses } from "../../helpers/utils";

const Delegation = (props) => {
    const {wakandaAddress} = props;
    const [delegatorAddress, setDelegatorddress] = useState();
    const [invalidAddress, setInvalidAddress] = useState(false);

    function onDelegatorAddressChange(e) {
        setInvalidAddress(false);
        const address = e.currentTarget.value;
        setDelegatorddress(address);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!isValidWakandaAddresses(delegatorAddress)) {
            setInvalidAddress(true);
        } else {
            //dispatch(wakandaRegistration(wakandaAddress));
        }
    }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="wakandaAddress">Your address</Form.Label>
                    <Form.Control type="text" name="wakandaAddress" value={wakandaAddress} required readOnly /> 
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="delegatorAddress">Delegator address</Form.Label>
                    <Form.Control type="text" name="delegatorAddress" isInvalid={invalidAddress} value={delegatorAddress} required onChange={(e) => onDelegatorAddressChange(e)} /> 
                    <Form.Control.Feedback type="invalid">
                        Invalid address
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Button variant="success" type="submit">
                        Delegate   
                    </Button>
                </Form.Group>
            </Form>
        </div> 
    );
};

export default Delegation;