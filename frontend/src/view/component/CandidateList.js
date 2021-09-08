import React, {useEffect, useState} from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { globalConstants } from "../../constants/global";
import { getCandidates } from "../../services/adminService";
import { candidatesData, candidatesHasErrors, candidatesLoading, candidatesError } from "../../redux/slices/candidatesSlice";
import { addAllCandidates } from "../../redux/actions/candidatesActions";
import Message from "./Message";

const CandidateList = (props) => {
    const dispatch = useDispatch();

    const addingCandidatesLoading = useSelector(candidatesLoading);
    const addingCandidatesHasErrors = useSelector(candidatesHasErrors);
    const addingCandidateResponse = useSelector(candidatesData);
    const addingCandidatesError = useSelector(candidatesError);
    
    const [errorMessage, setErrorMessage] = useState();
    const [candidateList, setCandidatesList] = useState();

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

    const onClickAddCandidatesHandler = () => {
        const size = candidateList.length;
        const allCanidadtes = [];
        for(let i=0;i<size;i++){
            const candidate = candidateList[i];
            allCanidadtes.push({...candidate, score:0, id: i});
        }
        dispatch(addAllCandidates(allCanidadtes));
    }

    return (
        <>  
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Age</th>
                        <th>Cult</th>
                    </tr>
                </thead>
                {candidateList && candidateList.map((data, index) =>{
                    return <tbody key={index}>
                            <tr>
                                <td>{index}</td>
                                <td>{data.name}</td>
                                <td>{data.age}</td>
                                <td>{data.cult}</td>
                            </tr>
                        </tbody>
                })}
            </Table>
            <Button variant="success" size="lg" onClick={ onClickAddCandidatesHandler }>Add Candidates</Button>
            {addingCandidatesLoading && <Message message={globalConstants.LOADING}/>}
            {addingCandidatesHasErrors ? 
                <Message message={addingCandidatesError}/> 
                : 
                addingCandidateResponse.response ?
                    <Message message={`${globalConstants.SUCCESS_ADDING_CANDIDATES}, ${addingCandidateResponse.response.transactionHash}`} /> 
                    : 
                    <Message message={addingCandidateResponse.reason}/>}
        </>
    )
}

export default CandidateList;