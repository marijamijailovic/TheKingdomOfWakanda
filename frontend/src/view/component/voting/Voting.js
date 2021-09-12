import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { isEmpty } from "underscore";
import { useDispatch, useSelector } from "react-redux";
import { globalConstants } from "../../../constants/global";
import { getItem, setItem } from "../../../helpers/storage";
import { status, balance, updateWakandaState } from "../../../redux/slices/wakandaSlice";
import { updateVotingState } from "../../../redux/slices/votingSlice";
import { getWakandaStatus, getWakandaBalance } from "../../../redux/thunks/wakandaThunks";
import Delegation from "./DelegationForm";
import VotingComponent from "./VotingForm";
import Leaderboard from "./Leaderboard";

const VotingPage = (props) => {
    const dispatch = useDispatch();
    
    const connectedAccount = getItem(globalConstants.META_MASK_ACCOUNT);
    const web3Support = getItem(globalConstants.WEB3_SUPPORT);
    
    const wakandaStatus = useSelector(status);
    const wakandaBalance = useSelector(balance);
    
    const balanceOfWKND = !isEmpty(wakandaBalance) && wakandaBalance.result && +wakandaBalance.result;
    //hardcoded because sc retur as array, without field name
    const wakandaRegistered = !isEmpty(wakandaStatus) && wakandaStatus.result && wakandaStatus.result[0];
    const wakandaVoted = !isEmpty(wakandaStatus) && wakandaStatus.result && wakandaStatus.result[2];
    const delegator = !isEmpty(wakandaStatus) && wakandaStatus.result && wakandaStatus.result[4];
    
    const [wantToVote, setWantToVote] = useState(true);
    const [wakandaAddress, setWakandaAddress] = useState(connectedAccount);

    useEffect(()=>{
        if(web3Support){
            window.ethereum.on("accountsChanged", function (accounts) {
                setItem(globalConstants.META_MASK_ACCOUNT, accounts[0]);
                setWakandaAddress(accounts[0]);
                dispatch(updateWakandaState());
                dispatch(updateVotingState());
            });
        }
    },[connectedAccount, web3Support, dispatch])

    useEffect(()=>{
        setItem(globalConstants.META_MASK_ACCOUNT, wakandaAddress);
        dispatch(getWakandaStatus(wakandaAddress));
        dispatch(getWakandaBalance(wakandaAddress));
    },[wakandaAddress, dispatch]);

    const onChangeRadioButtonHandler = (e) => {
        const value = !wantToVote;
        setWantToVote(value);
    }

  return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            {((wakandaRegistered && wakandaVoted) || (delegator && balanceOfWKND === 0)) && <Leaderboard />}
            {wakandaRegistered && wakandaAddress && balanceOfWKND > 0 &&
                    <div>
                        <div className = "notice">
                            {`Your voting address is ${wakandaAddress}, and you can send up to ${balanceOfWKND} vote!`}<br/>
                        </div>
                        {!delegator && 
                            <Form className="c-wakanda-form c-voting-option">
                                    <Form.Check>
                                        <Form.Check.Input type="radio" value={true} name="vote" checked={wantToVote} onChange={onChangeRadioButtonHandler}/>
                                        <Form.Check.Label>Vote</Form.Check.Label>
                                    </Form.Check>
                                    <Form.Check>
                                        <Form.Check.Input type="radio" value={false} name="vote" checked={!wantToVote} onChange={onChangeRadioButtonHandler}/>
                                        <Form.Check.Label>Delegate</Form.Check.Label>
                                    </Form.Check>
                            </Form>
                        }
                        {wantToVote ? 
                            <VotingComponent wakandaAddress={wakandaAddress} balanceOfWKND={balanceOfWKND}/>
                            : 
                            <Delegation wakandaAddress={wakandaAddress}/>
                        } 
                    </div>
            }
        </div>
    )
}

export default VotingPage;