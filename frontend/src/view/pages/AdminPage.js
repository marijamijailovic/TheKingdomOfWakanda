import React, {useState, useEffect} from "react";
import { getCandidates } from "../../services/adminService";
import Message from "../component/Message";
import CandidateList from "../component/CandidateList";

const WelcomePage = () => {
    const [candidateList, setCandidatesList] = useState();
    const [errorMessage, setErrorMessage] = useState();
    
    useEffect(() => {
        const fetchAllCandidates = async() => {
            const response = await getCandidates();
            if(response && response.OK) {
                setCandidatesList(response.Data.candidates);
            } else {
                setErrorMessage(response.ErrorText);
            }
        }
        fetchAllCandidates();
    },[]);

    if(errorMessage) {
        return <Message message={errorMessage} />
    }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <CandidateList candidateData={candidateList} />
        </div>
    );
};

export default WelcomePage;