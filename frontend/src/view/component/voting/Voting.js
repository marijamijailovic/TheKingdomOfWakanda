import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { isEmpty } from "underscore";
import { useDispatch, useSelector } from "react-redux";
import { globalConstants } from "../../../constants/global";
import { getItem, setItem } from "../../../helpers/storage";
import { status, updateState } from "../../../redux/slices/wakandaSlice";
import { getWakandaStatus } from "../../../redux/thunks/wakandaThunks";
import Delegation from "./DelegationForm";
import VotingComponent from "./VotingForm";
import Leaderboard from "./Leaderboard";

const VotingPage = (props) => {
    const dispatch = useDispatch();
    
    const connectedAccount = getItem(globalConstants.META_MASK_ACCOUNT);
    const web3Support = getItem(globalConstants.WEB3_SUPPORT);
    
    const wakandaStatus = useSelector(status);
    
    const balanceOfWKND = !isEmpty(wakandaStatus) && wakandaStatus.response ? +wakandaStatus.response.balance : 0;
    const wakandaRegistered = !isEmpty(wakandaStatus) && wakandaStatus.response && wakandaStatus.response.registered;
    
    const [wantToVote, setWantToVote] = useState(true);
    const [wakandaAddress, setWakandaAddress] = useState(connectedAccount);

    useEffect(()=>{
        if(web3Support){
            window.ethereum.on("accountsChanged", function (accounts) {
                setItem(globalConstants.META_MASK_ACCOUNT, accounts[0]);
                setWakandaAddress(accounts[0]);
                dispatch(updateState());
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

  return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            {wakandaRegistered && balanceOfWKND === 0 && <Leaderboard />}
            {wakandaRegistered && wakandaAddress && balanceOfWKND > 0 &&
                    <div>
                        <div className = "notice">
                            {`Your voting address is ${wakandaAddress}, and you can send up to ${balanceOfWKND} vote!`}<br/>
                        </div>
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