import React, { useEffect, useState } from "react";
import { getCandidates } from "../../services/votingService";
import { getBalanceOf } from "../../services/registrationService";
import { Card, Button,  Row, Col } from "react-bootstrap";
import InputNumber from 'rc-input-number';
import { useDispatch, useSelector } from "react-redux";
import {voteWakanda, showLeadrboard} from "../../actions";
import Leaderboard from "../component/Leaderboard";

const VotingPage = (props) => {
    const dispatch = useDispatch();
    const { wakandaAddress } = useSelector((state) => state.wakandaReducer);
    const { voteData, voteError } = useSelector((state) => state.votingReducer);
    const { showLeaderBoard, leadersData, leadersError } = useSelector((state) => state.leadersReducer);
    const [candidatesList, setCandidatesList] = useState();
    const [balanceOfWKND, setBalanceOfWKND] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const onWakandaAmountOfVotesChange = (e) => {
        setErrorMessage();
        setBalanceOfWKND(e.currentTarget.value);
    }

    const onClickVoteHandler = (wakandaAddress, candidateId, candidate, amountOfVotes) => {
        setErrorMessage();
        dispatch(voteWakanda(wakandaAddress, candidateId, candidate, amountOfVotes));
    }

    const onClickLeaderboardHandler = () => {
        setErrorMessage();
        dispatch(showLeadrboard());
    }

    useEffect(() => {
        const fetchAllCandidates = async() => {
            const response = await getCandidates();
            if(response && response.OK) {
                setCandidatesList(response.Data.candidates);
            } else {
                setErrorMessage(response.ErrorText);
            }
        }

        const fetchWakandaBalance = async () => {
            const response = await getBalanceOf(wakandaAddress);
            if(response) {
                if(!response.OK || response.StatusCode !== 200) {
                    setErrorMessage(response.ErrorText);
                } else {
                    setBalanceOfWKND(response.Data.response);
                }
            }
        }
        fetchAllCandidates();
        fetchWakandaBalance();
    },[wakandaAddress]);

    if(errorMessage && errorMessage !== "") {
        return <p>{errorMessage}</p>;
    }

    return (
        <>  
            <div>{voteError && voteError !== "" ? <p>{voteError}</p> : ""}</div>
            {!voteData ?
                <>
                    <h2>Welcome to voting page</h2>
                    <div>{`Your voting address is ${wakandaAddress}, and you can send up to ${balanceOfWKND} vote!`}</div>
                    <Row xs={1} md={2} className="g-4">
                        {candidatesList && candidatesList.map((candidate, index) => {
                            return <Col key={index}>
                                    <Card className="text-center" border="dark">
                                        <Card.Header>{`${candidate.name}, ${candidate.age} years old, from ${candidate.cult}`}</Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                Number of votes:
                                                <InputNumber min={1} max={balanceOfWKND} defaultValue={balanceOfWKND} value={balanceOfWKND} onChange={(e) => onWakandaAmountOfVotesChange(e)}/>
                                            </Card.Text>
                                            <Button variant="success" size="lg" onClick={() => onClickVoteHandler(wakandaAddress, index, candidate, balanceOfWKND)}>Vote</Button>
                                        </Card.Body>
                                    </Card>
                                </Col> 
                            })
                        }
                    </Row>
                </>
                : 
                <div>
                    <div>{voteData}</div>
                    <Button variant="success" size="lg" onClick={() => onClickLeaderboardHandler()}>Show leads</Button>
                    {showLeaderBoard ? 
                        <div>
                            <Leaderboard leadersData={leadersData} />
                        </div>
                        :
                        <div>{leadersError}</div>
                    }
                </div>
            }           
        </>
    )
}

export default VotingPage;