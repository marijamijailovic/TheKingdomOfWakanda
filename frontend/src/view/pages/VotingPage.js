import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import { globalConstants } from "../../constants/global";
import { getItem, setItem } from "../../helpers/storage";
import { wakandaData, wakandaHasErrors, wakandaError } from "../../redux/slices/wakandaSlice";
import { getWakandaStatus } from "../../redux/actions/wakandaActions";

import Delegation from "../component/Delegation";
import VotingComponent from "../component/VotingComponent";
import Leaderboard from "../component/Leaderboard";
import { votingData, votingHasErrors, votingError } from "../../redux/slices/votingSlice";

const VotingPage = (props) => {
    const dispatch = useDispatch();
    
    const connectedAccount = getItem(globalConstants.META_MASK_ACCOUNT);
    const web3Support = getItem(globalConstants.WEB3_SUPPORT);
    
    const gettingWakandaStatusHasError = useSelector(wakandaHasErrors);
    const wakandaStatusData = useSelector(wakandaData);
    const gettingWakandaStatusError = useSelector(wakandaError);

    const sendingVoteHasErrors = useSelector(votingHasErrors);
    const voteResponse = useSelector(votingData);
    const sendingVoteError = useSelector(votingError);
    
    const balanceOfWKND = wakandaStatusData && wakandaStatusData.response ? +wakandaStatusData.response.balance : 0;
    const wakandaRegistered = wakandaStatusData && wakandaStatusData.response && wakandaStatusData.response.registered;
    const [wantToVote, setWantToVote] = useState(true);
    const [wakandaAddress, setWakandaAddress] = useState(connectedAccount);

    useEffect(()=>{
        if(web3Support){
            window.ethereum.on("accountsChanged", function (accounts) {
                setItem(globalConstants.META_MASK_ACCOUNT, accounts[0]);
                setWakandaAddress(accounts[0]);
            });
        }
    },[connectedAccount, web3Support, dispatch])

    useEffect(()=>{
        setItem(globalConstants.META_MASK_ACCOUNT, wakandaAddress);
        dispatch(getWakandaStatus(wakandaAddress));
    },[wakandaAddress, dispatch]);

    const onChangeRadioButtonHandler = (e) => {
        const value = !wantToVote;
        setWantToVote(value);
    }

    if(!web3Support) {
        return <Message message={globalConstants.NOT_WEB3_BROWSER} />
    }

    if(gettingWakandaStatusHasError) {
        return <Message message={gettingWakandaStatusError} />;
    }

    if(sendingVoteHasErrors) {
        return <Message message={sendingVoteError} />;
    }

    if(voteResponse.transactionHash) {
        return (
            <div>
                <Message message={`Success tx is: ${voteResponse.transactionHash}`} />
                <Leaderboard />
            </div>)
    }

    return (
        <>
            <h2>Welcome to voting page</h2>
            {wakandaRegistered && balanceOfWKND === 0 && <Leaderboard />}
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