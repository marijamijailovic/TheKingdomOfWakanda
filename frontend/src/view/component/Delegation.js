import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { globalConstants } from "../../constants/global";
import { getDelegators } from "../../redux/actions/delegatorActions";
import { delegatorData, delegatorHasErrors, delegatorLoading, delegatorError } from "../../redux/slices/delegatorSlice";
import { delegateVote } from "../../redux/actions/votingAction";
import Message from "./Message";

const Delegation = (props) => {
    const {wakandaAddress} = props;
    const dispatch = useDispatch();
    
    const gettingDelegatorsLoading = useSelector(delegatorLoading);
    const gettingDelegatorsHasErrors = useSelector(delegatorHasErrors);
    const delegationResponse = useSelector(delegatorData);
    const gettingDelegatorsError = useSelector(delegatorError);

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

    function handleSubmit(event) {
        event.preventDefault();
        if(selectedDelegator === "0") {
            setInvalidAddress(true);
        } else {
            dispatch(delegateVote(wakandaAddress, selectedDelegator));
        }
    }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="wakandaAddress">Your address</Form.Label>
                    <Form.Control type="text" name="wakandaAddress" value={wakandaAddress} required readOnly /> 
                </Form.Group>
                {gettingDelegatorsLoading ? 
                    <Message message={globalConstants.LOADING}/> :
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
                            {delegationResponse.response && delegationResponse.response.map((delegator,index)=>{
                                    return <option key={index} value={delegator}>{delegator}</option>
                                })
                            }
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Invalid address
                        </Form.Control.Feedback>
                    </Form.Group>
                }
                <Form.Group>
                    <Button variant="success" type="submit"  onClick={handleSubmit}>
                        Delegate   
                    </Button>
                </Form.Group>
            </Form>
            {gettingDelegatorsHasErrors && <Message message={gettingDelegatorsError}/>}
        </div> 
    );
};

export default Delegation;