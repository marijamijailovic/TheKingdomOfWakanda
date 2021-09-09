import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import InputNumber from "rc-input-number";
import { useDispatch, useSelector } from "react-redux";
import { candidates} from "../../redux/slices/candidatesSlice";
import { getCandidates } from "../../redux/thunks/candidatesThunks";
//import { getAllCandidates } from "../../redux/actions/candidatesActions";
import { vote } from "../../redux/thunks/votingThunks";
//import { candidatesData, candidatesHasErrors, candidatesLoading, candidatesError } from "../../redux/slices/candidatesSlice";

const VotingComponent = (props) => {
    const {wakandaAddress, balanceOfWKND} = props;
    const dispatch = useDispatch();
    
    // const gettingCandidatesLoading = useSelector(candidatesLoading);
    // const gettingCandidatesHasErrors = useSelector(candidatesHasErrors);
    // const allCandidatesList = useSelector(candidatesData);
    // const gettingCandidatesError = useSelector(candidatesError);
    const allCandidatesList = useSelector(candidates);

    const [amountOfVotes, setAmountOfVotes] = useState(balanceOfWKND);
    const [selectedPresident, setSelectedPresident] = useState("-1");
    const [invalidCandidate, setInvalidCandidate] = useState(false);

    useEffect(()=>{
        dispatch(getCandidates());
    },[dispatch]);

    function onPresidentChangeHandler(event) {
        setInvalidCandidate(false);
        const choosenPresident = event.target.value;
        setSelectedPresident(choosenPresident);
    }

    function handleSubmitVote(event) {
        event.preventDefault();
        if(selectedPresident === "-1") {
            setInvalidCandidate(true);
        } else {
            dispatch(vote({wakandaAddress, candidateId: selectedPresident, amountOfVotes}));
        }
    }

    // if(gettingCandidatesHasErrors) {
    //     return <Message message={gettingCandidatesError} />;
    // }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="wakandaAddress">Your address</Form.Label>
                    <Form.Control type="text" name="wakandaAddress" value={wakandaAddress} required readOnly /> 
                </Form.Group>
                {/* {gettingCandidatesLoading ? 
                    <Message message={globalConstants.LOADING}/> : */}
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
                {/* } */}
                <Form.Group>
                    <Form.Label htmlFor="balanceOfWakanda">Your amount of vote:</Form.Label>
                    <InputNumber min={1} max={balanceOfWKND} defaultValue={balanceOfWKND} value={amountOfVotes} onChange={setAmountOfVotes}/>
                </Form.Group>
                <Form.Group>
                    <Button variant="success" type="submit" name="vote" onClick={handleSubmitVote}>
                        Vote   
                    </Button>
                </Form.Group>
            </Form>
        </div> 
    )
}

export default VotingComponent;