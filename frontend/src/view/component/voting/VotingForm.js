import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import InputNumber from "rc-input-number";
import { isEmpty } from "underscore";
import { useDispatch, useSelector } from "react-redux";
import { candidates} from "../../../redux/slices/candidatesSlice";
import { getCandidates } from "../../../redux/thunks/candidatesThunks";
import { vote } from "../../../redux/thunks/votingThunks";
import { voteData, updateState } from "../../../redux/slices/votingSlice";
import Leaderboard from "./Leaderboard";
import Message from "../Message";

const VotingComponent = (props) => {
    const {wakandaAddress, balanceOfWKND} = props;

    const dispatch = useDispatch();
    
    const allCandidatesList = useSelector(candidates);
    const voteDataTx = useSelector(voteData);

    const [amountOfVotes, setAmountOfVotes] = useState(balanceOfWKND);
    const [selectedPresident, setSelectedPresident] = useState("-1");
    const [invalidCandidate, setInvalidCandidate] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    useEffect(()=>{
        dispatch(getCandidates());
    },[dispatch]);

    const onPresidentChangeHandler = (event) => {
        setInvalidCandidate(false);
        const choosenPresident = event.target.value;
        setSelectedPresident(choosenPresident);
    }

    const handleSubmitVote = (event) => {
        event.preventDefault();
        dispatch(updateState());
        if(selectedPresident === "-1") {
            setInvalidCandidate(true);
        } else {
            dispatch(vote({wakandaAddress, candidateId: selectedPresident, amountOfVotes}));
        }
    }

    const handleShowLeaderboard = () => {
        setShowLeaderboard(true);
    }

    return (
        <>
            <div className="notice">
                <label>{`*Make sure that voting address and connected address are the same, in opposite voting will fail!*`}</label>
            </div>
            <Form className="c-wakanda-form">
                <Form.Group>
                    <Form.Label htmlFor="wakandaAddress">Your address</Form.Label>
                    <Form.Control type="text" name="wakandaAddress" value={wakandaAddress} required readOnly /> 
                </Form.Group>
                    <Form.Group controlId="delegator">
                        <Form.Label>Choose your wakanda presidend</Form.Label>
                        <Form.Control 
                            required
                            isInvalid={invalidCandidate}
                            type="text"
                            as="select"
                            onChange={onPresidentChangeHandler}
                            name="delegator">
                            <option value={"-1"}>Open to select president</option>
                            {allCandidatesList.response && allCandidatesList.response.map((candidate,index)=>{
                                    return <option key={index} value={candidate[4]}>{`${candidate[0]}, age ${candidate[1]}, ${candidate[2]}`}</option>
                                })
                            }
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Invalid address
                        </Form.Control.Feedback>
                    </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="balanceOfWakanda">Your amount of vote:</Form.Label>
                    <InputNumber min={1} max={balanceOfWKND} defaultValue={balanceOfWKND} value={amountOfVotes} onChange={setAmountOfVotes}/>
                </Form.Group>
                <Form.Group>
                    <Button variant="success" type="submit" name="vote" onClick={handleSubmitVote}>
                        Vote   
                    </Button>
                </Form.Group>
                {!isEmpty(voteDataTx) && 
                    <div>
                        <Message data={voteDataTx} />
                        {voteDataTx.response &&
                            <Button variant="success" name="leaderboard" onClick={handleShowLeaderboard}>
                                Show Leaderboard   
                            </Button>
                        }
                    </div>
                }
            </Form>
            {showLeaderboard && <Leaderboard/>}
        </>
    )
}

export default VotingComponent;