import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import { globalConstants } from "../../constants/global";
import { getItem } from "../../helpers/storage";
import { wakandaData, wakandaHasErrors, wakandaError } from "../../redux/slices/wakandaSlice";
import { getBalanceOf } from "../../redux/actions/wakandaActions";

import Delegation from "../component/Delegation";
import VotingComponent from "../component/VotingComponent";
import Leaderboard from "../component/Leaderboard";
import { isEmpty } from "../../helpers/utils";
import { votingData, votingHasErrors, votingError } from "../../redux/slices/votingSlice";

const VotingPage = (props) => {
    const dispatch = useDispatch();
    
    const connectedAccount = useSelector(state => state.connectedAccount.account);
    const wakandaAddress = !isEmpty(connectedAccount) ? connectedAccount : getItem(globalConstants.META_MASK_ACCOUNT);
    
    const gettingBalanceHasError = useSelector(wakandaHasErrors);
    const balanceData = useSelector(wakandaData);
    const gettingBalanceError = useSelector(wakandaError);

    const sendingVoteHasErrors = useSelector(votingHasErrors);
    const voteResponse = useSelector(votingData);
    const sendingVoteError = useSelector(votingError);
    
    const balanceOfWKND = balanceData && balanceData.response ? +balanceData.response : 0;
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

    if(voteResponse.transactionHash) {
        return (
            <div>
                <Message message={`Success tx is: ${voteResponse.transactionHash}`} />;
                <Leaderboard />
            </div>)
    }

    return (
        <>
            <h2>Welcome to voting page</h2>
            {balanceOfWKND === 0 && <Leaderboard />}
            {wakandaAddress && balanceOfWKND > 0 &&
                    <div>
                        <label>{`Your voting address is ${wakandaAddress}, and you can send up to ${balanceOfWKND} vote!`}</label>
                        <Form>
                            <Form.Check.Input type="radio" value={true} name="vote" checked={wantToVote} onChange={onChangeRadioButtonHandler}/>
                            <Form.Check.Label>Vote</Form.Check.Label>
                            
                            <Form.Check.Input type="radio" value={false} name="vote" checked={!wantToVote} onChange={onChangeRadioButtonHandler}/>
                            <Form.Check.Label>Delegate</Form.Check.Label>
                        </Form>
                        {wantToVote ? 
                            <VotingComponent wakandaAddress={wakandaAddress} balanceOfWKND={balanceOfWKND}/>
                            : 
                            <Delegation wakandaAddress={wakandaAddress}/>
                        }   
                    </div>
            }
        </>
    )
}

export default VotingPage;