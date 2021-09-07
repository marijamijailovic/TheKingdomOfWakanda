import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import { globalConstants } from "../../constants/global";
import { getItem } from "../../helpers/storage";
import { wakandaData, wakandaHasErrors, wakandaError } from "../../redux/wakandaSlice";
import { getBalanceOf } from "../../redux/actions/wakandaActions";
import { votingData, votingHasErrors, votingError } from "../../redux/votingSlice";
import Delegation from "../component/Delegation";
import VotingComponent from "../component/VotingComponent";
import Leaderboard from "../component/Leaderboard";

const VotingPage = (props) => {
    const dispatch = useDispatch();
    const gettingBalanceHasError = useSelector(wakandaHasErrors);
    const balanceData = useSelector(wakandaData);
    const gettingBalanceError = useSelector(wakandaError);
    const sendingVoteHasErrors = useSelector(votingHasErrors);
    const sendingVoteResponse = useSelector(votingData);
    const sendingVoteError = useSelector(votingError);
    const wakandaAddress = getItem(globalConstants.META_MASK_ACCOUNT);
    const balanceOfWKND = balanceData ? +balanceData.response : 0;
    const [wantToVote, setWantToVote] = useState(true);

    useEffect(()=>{
        dispatch(getBalanceOf(wakandaAddress));
    },[wakandaAddress, dispatch]);

    const onChangeRadioButtonHandler = (e) => {
        const value = !wantToVote;
        setWantToVote(value);
    }

    if(gettingBalanceHasError) {
        return <Message message={gettingBalanceError} />;
    }

    if(sendingVoteHasErrors) {
        return <Message message={sendingVoteError} />;
    }

    if(gettingBalanceHasError) {
        return <Message message={gettingBalanceError} />;
    }

    if(sendingVoteResponse || balanceOfWKND === 0) {
        return <Leaderboard />;
    }

    return (
        <>
            <h2>Welcome to voting page</h2>
            {wakandaAddress && balanceOfWKND > 0 &&
                <div>
                    <p>{`Your voting address is ${wakandaAddress}, and you can send up to ${balanceOfWKND} vote!`}</p>
                    <Form>
                        <Form.Check.Input type="radio" value={true} name="vote" checked={wantToVote} onChange={onChangeRadioButtonHandler}/>
                        <Form.Check.Label>Vote</Form.Check.Label>
                        
                        <Form.Check.Input type="radio" value={false} name="vote" checked={!wantToVote} onChange={onChangeRadioButtonHandler}/>
                        <Form.Check.Label>Delegate</Form.Check.Label>
                    </Form>
                    {wantToVote ? 
                        <VotingComponent wakandaAddress={wakandaAddress}/>
                        : 
                        <Delegation wakandaAddress={wakandaAddress}/>
                    }
                </div>        
            }
        </>
    )
}

export default VotingPage;