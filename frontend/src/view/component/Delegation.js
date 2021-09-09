import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "underscore";
import { getDelegators } from "../../redux/thunks/delegatorThunks";
import { delegators } from "../../redux/slices/delegatorSlice";
import { delegate } from "../../redux/thunks/votingThunks";
import Message from "./Message";

const Delegation = (props) => {
    const {wakandaAddress} = props;
    const dispatch = useDispatch();
    
    const delegatorsData = useSelector(delegators);

    const [selectedDelegator, setSelectedDelegator] = useState("0");
    const [invalidAddress, setInvalidAddress] = useState(false);

    useEffect(()=>{
        dispatch(getDelegators());
    },[dispatch]);

    function onDelegatorChangeHandler(event) {
        setInvalidAddress(false);
        const choosendDelegator = event.target.value;
        setSelectedDelegator(choosendDelegator);
    }

    function handleSubmitDelegate(event) {
        event.preventDefault();
        if(selectedDelegator === "0") {
            setInvalidAddress(true);
        } else {
            dispatch(delegate({wakandaAddress, delegatorAddress: selectedDelegator}));
        }
    }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="wakandaAddress">Your address</Form.Label>
                    <Form.Control type="text" name="wakandaAddress" value={wakandaAddress} required readOnly /> 
                </Form.Group>
                    <Form.Group controlId="delegator">
                        <Form.Label>Choose Delegator</Form.Label>
                        <Form.Control 
                            required
                            isInvalid={invalidAddress}
                            type="text"
                            as="select"
                            onChange={onDelegatorChangeHandler}
                            name="delegator">
                            <option value={0}>Open to select delegator</option>
                            {!isEmpty(delegatorsData) && delegatorsData.response && delegatorsData.response.map((delegator,index)=>{
                                    return <option key={index} value={delegator}>{delegator}</option>
                                })
                            }
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Invalid address
                        </Form.Control.Feedback>
                    </Form.Group>
                <Form.Group>
                    <Button variant="success" type="submit" name="delegate" onClick={handleSubmitDelegate}>
                        Delegate   
                    </Button>
                </Form.Group>
            </Form>
            {delegatorsData.error && <Message message={delegatorsData.error}/>}
            {delegatorsData.reason && <Message message={delegatorsData.reason}/>}
        </div> 
    );
};

export default Delegation;