import React from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { globalConstants } from "../../constants/global";
import {  candidatesData, candidatesHasErrors, candidatesLoading, candidatesError } from "../../redux/candidatesSlice"
import { addAllCandidates } from "../../redux/actions/candidatesActions";
import Message from "./Message";

const CandidateList = (props) => {
    const dispatch = useDispatch();
    const addingCandidatesLoading = useSelector(candidatesLoading);
    const addingCandidatesHasErrors = useSelector(candidatesHasErrors);
    const addingCandidateResponse = useSelector(candidatesData);
    const addingCandidatesError = useSelector(candidatesError);
    

    const onClickAddCandidatesHandler = () => {
        const size = props.candidateData.length;
        const allCanidadtes = [];
        for(let i=0;i<size;i++){
            allCanidadtes.push({...props.candidateData[i], score:0, id: i});
        }
        dispatch(addAllCandidates(allCanidadtes));
    }

    if(addingCandidateResponse && addingCandidateResponse.status === globalConstants.SUCCESS) {
        return <Message message={globalConstants.SUCCESS_ADDING_CANDIDATES}/>
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
                {props.candidateData && props.candidateData.map((data, index) =>{
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
            {addingCandidatesLoading && <p>Loading...</p>}
            {addingCandidatesHasErrors && <p>{addingCandidatesError}</p>}
        </>
    )
}

export default CandidateList;