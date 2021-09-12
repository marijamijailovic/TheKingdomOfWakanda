import React, {useEffect, useState} from "react";
import { Table, Button } from "react-bootstrap";
import { globalConstants } from "../../../constants/global";
import { isEmpty } from "underscore";
import { getCandidates } from "../../../services/adminService";
import { useDispatch, useSelector } from "react-redux";
import { transaction, updateCandidateState } from "../../../redux/slices/candidatesSlice";
import { addCandidates } from "../../../redux/thunks/candidatesThunks";
import Message from "../Message";

const CandidateList = (props) => {
    const dispatch = useDispatch();

    const addCandidatesTx = useSelector(transaction);
    
    const [errorMessage, setErrorMessage] = useState();
    const [candidateList, setCandidatesList] = useState();

    useEffect(() => {
        const fetchAllCandidates = async() => {
            const response = await getCandidates();
            if(response) {
                setCandidatesList(response.candidates);
            } else {
                setErrorMessage(globalConstants.FAILED_GETING_CANIDATES);
            }
        }
        fetchAllCandidates();
    },[]);

    if(errorMessage) {
        return <Message message={errorMessage} />
    }

    const onClickAddCandidatesHandler = () => {
        dispatch(updateCandidateState());
        const allCanidadtes = candidateList.map((candidate, index) => {
            return {
                ...candidate,
                score: 0,
                id: index
            }
        })
        dispatch(addCandidates(allCanidadtes));
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
            {!isEmpty(addCandidatesTx) && <Message data={addCandidatesTx}/>}
        </>
    )
}

export default CandidateList;