import React, { useEffect, useState } from "react";
import { Card, Button,  Row, Col } from "react-bootstrap";
import InputNumber from "rc-input-number";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { getAllCandidates } from "../../redux/actions/candidatesActions";
import { vote } from "../../redux/actions/votingAction";
import { wakandaData, wakandaHasErrors, wakandaError } from "../../redux/wakandaSlice";
import { getBalanceOf } from "../../redux/actions/wakandaActions";
import { candidatesData, candidatesHasErrors, candidatesLoading, candidatesError } from "../../redux/candidatesSlice";

const VotingComponent = (props) => {
    const {wakandaAddress} = props;
    const dispatch = useDispatch();
    const gettingBalanceHasError = useSelector(wakandaHasErrors);
    const balanceData = useSelector(wakandaData);
    const gettingBalanceError = useSelector(wakandaError);
    const gettingCandidatesLoading = useSelector(candidatesLoading);
    const gettingCandidatesHasErrors = useSelector(candidatesHasErrors);
    const allCandidatesList = useSelector(candidatesData);
    const gettingCandidatesError = useSelector(candidatesError);

    const balanceOfWKND = balanceData ? +balanceData.response : 0;
    const [amountOfVotes, setAmountOfVotes] = useState(balanceOfWKND);

    useEffect(()=>{
        dispatch(getBalanceOf(wakandaAddress));
        dispatch(getAllCandidates());
    },[wakandaAddress, dispatch]);

    const onClickVoteHandler = (e, candidateId) => {
        e.preventDefault(); 
        dispatch(vote(wakandaAddress, candidateId, amountOfVotes));
    }

    if(gettingBalanceHasError) {
        return <Message message={gettingBalanceError} />;
    }

    return (
        <>
            {gettingCandidatesLoading && <p>Loading...</p>}
            {gettingCandidatesHasErrors ?
                <p>{gettingCandidatesError}</p> 
                : 
                <Row xs={1} md={2} className="g-4">
                    {allCandidatesList && allCandidatesList.response && allCandidatesList.response.map((candidate, index) => {
                        return <Col key={index}>
                                <Card className="text-center" border="dark">
                                    <Card.Header>
                                        {/* These is hardcoded because receving format from sc is Array[Array(Candidate) without field name]  and the length is 5(name,age,cult,score,id)*/}
                                        {`${candidate[0]}, ${candidate[1]} years old, from ${candidate[2]}`}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            Number of votes:
                                            <InputNumber min={1} max={balanceOfWKND} defaultValue={balanceOfWKND} value={amountOfVotes} onChange={setAmountOfVotes}/>
                                        </Card.Text>
                                        <Button variant="success" size="lg" onClick={(e)=>onClickVoteHandler(e,candidate[4])}>Vote</Button>
                                    </Card.Body>
                                </Card>
                            </Col> 
                        })
                    }
                </Row>
            }
        </>
    )
}

export default VotingComponent;