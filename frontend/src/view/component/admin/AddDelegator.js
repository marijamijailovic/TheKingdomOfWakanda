import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { isEmpty } from "underscore";
import { isValidWakandaAddresses } from "../../../helpers/utils";
import { useDispatch, useSelector } from "react-redux";
import { delegators, updateState } from "../../../redux/slices/delegatorSlice";
import { addDelegator } from "../../../redux/thunks/delegatorThunks";
import Message from "../Message";

const AddDelegator = (props) => {
    const dispatch = useDispatch();
    
    const addDelegatorsTx = useSelector(delegators);
    
    const [delegatorAddress, setDelegatorAddress] = useState("");
    const [invalidAddress, setInvalidAddress] = useState(false);

    function onDelegatorAddressChange(e) {
        setInvalidAddress(false);
        const address = e.currentTarget.value;
        setDelegatorAddress(address);
        dispatch(updateState());
    }

    function handleSubmitAddDelegator(event) {
        event.preventDefault();
        if(!isValidWakandaAddresses(delegatorAddress)) {
            setInvalidAddress(true);
        } else {
            dispatch(addDelegator(delegatorAddress));
        }
    }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <Form className="c-wakanda-form">
                <Form.Group>
                    <Form.Label htmlFor="delegatorAddress">Input delegator address:</Form.Label>
                    <Form.Control type="text" name="delegatorAddress" isInvalid={invalidAddress} value={delegatorAddress} required onChange={(e) => onDelegatorAddressChange(e)} /> 
                    <Form.Control.Feedback type="invalid">
                        Invalid address
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Button variant="success" type="submit" name="addDelegator" onClick={handleSubmitAddDelegator}>
                        Register delegator  
                    </Button>
                </Form.Group>
                {!isEmpty(addDelegatorsTx) && <Message data={addDelegatorsTx}/>}
            </Form>
        </div>
    );
};

export default AddDelegator;