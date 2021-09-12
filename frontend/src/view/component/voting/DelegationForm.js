import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { isEmpty } from "underscore";
import { useDispatch, useSelector } from "react-redux";
import { getDelegators } from "../../../redux/thunks/delegatorThunks";
import { delegators } from "../../../redux/slices/delegatorSlice";
import { delegate } from "../../../redux/thunks/votingThunks";
import { delegateData, updateVotingState } from "../../../redux/slices/votingSlice";
import Message from "../Message";
import Leaderboard from "./Leaderboard";

const Delegation = (props) => {
    const {wakandaAddress} = props;
    const dispatch = useDispatch();
    
    const delegatorsData = useSelector(delegators);
    const delegateDataTx = useSelector(delegateData);

    const [selectedDelegator, setSelectedDelegator] = useState("0");
    const [invalidAddress, setInvalidAddress] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    useEffect(()=>{
        dispatch(getDelegators());
    },[dispatch]);

    const onDelegatorChangeHandler = (event) => {
        setInvalidAddress(false);
        const choosendDelegator = event.target.value;
        setSelectedDelegator(choosendDelegator);
        dispatch(updateVotingState());
    }

    const handleSubmitDelegate = (event) => {
        event.preventDefault();
        dispatch(updateVotingState());
        if(selectedDelegator === "0") {
            setInvalidAddress(true);
        } else {
            dispatch(delegate({wakandaAddress, delegatorAddress: selectedDelegator}));
        }
    }

    const handleShowLeaderboard = () => {
        setShowLeaderboard(true);
    }

    return (
        <>
            <div className="notice">
                <label>
                    {`*You could delegate only 1WKND*`}<br />
                    {`*Make sure that voting address and connected address are the same, in opposite delegation of vote will fail!*`}
                </label>
            </div>
            <Form className="c-wakanda-form">
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
                            {delegatorsData.result && delegatorsData.result.map((delegator,index)=>{
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
                {!isEmpty(delegateDataTx) && 
                    <div>
                        <Message data={delegateDataTx} />
                        {delegateDataTx.response && 
                            <Button variant="success" name="leaderboard" onClick={handleShowLeaderboard}>
                                Show Leaderboard   
                            </Button>
                        }
                    </div>
                }
            </Form>
            {showLeaderboard && <Leaderboard/>}
        </>
    );
};

export default Delegation;