import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { globalConstants } from "../../constants/global";
import { isValidWakandaAddresses } from "../../helpers/utils";
import { delegatorData, delegatorHasErrors, delegatorLoading, delegatorError } from "../../redux/slices/delegatorSlice";
import { addDelegator } from "../../redux/actions/delegatorActions";
import Message from "../component/Message";

const AddDelegator = (props) => {
    const dispatch = useDispatch();
    const addingDelegatorLoading = useSelector(delegatorLoading);
    const addingDelegatorHasErrors = useSelector(delegatorHasErrors);
    const addingDelegatorResponse = useSelector(delegatorData);
    const addingDelegatorError = useSelector(delegatorError);
    
    const [delegatorAddress, setDelegatorAddress] = useState("");
    const [invalidAddress, setInvalidAddress] = useState(false);

    function onDelegatorAddressChange(e) {
        setInvalidAddress(false);
        const address = e.currentTarget.value;
        setDelegatorAddress(address);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!isValidWakandaAddresses(delegatorAddress)) {
            setInvalidAddress(true);
        } else {
            dispatch(addDelegator(delegatorAddress));
        }
    }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="delegatorAddress">Input delegator address:</Form.Label>
                    <Form.Control type="text" name="delegatorAddress" isInvalid={invalidAddress} value={delegatorAddress} required onChange={(e) => onDelegatorAddressChange(e)} /> 
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
            {addingDelegatorLoading && <Message />}
            {addingDelegatorHasErrors ? 
                <Message message ={addingDelegatorError}/> 
                : 
                addingDelegatorResponse.response ?
                    <Message message={`${globalConstants.SUCCESS_ADDING_DELEGATOR}, ${addingDelegatorResponse.response.transactionHash}`}/>
                    : 
                    <Message message={addingDelegatorResponse.reason}/>}
        </div>
    );
};

export default AddDelegator;