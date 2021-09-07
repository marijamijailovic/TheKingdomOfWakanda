import React, {useEffect} from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  candidatesData, candidatesHasErrors, candidatesLoading, candidatesError } from "../../redux/candidatesSlice";
import { getWinningCandidates } from "../../redux/actions/candidatesActions";

const Leaderboard = (props) => {
    const dispatch = useDispatch();
    const gettingLeaderboardLoading = useSelector(candidatesLoading);
    const gettingLeaderboardHasError = useSelector(candidatesHasErrors);
    const leaderboardData = useSelector(candidatesData);
    const gettingLeaderboardError = useSelector(candidatesError);
    
    const onClickLeaderboardHandler = () => {
        dispatch(getWinningCandidates());
    }

    useEffect(()=>{
        dispatch(getWinningCandidates());
    },[dispatch])

    return (
        <>
            <Button variant="success" size="lg" onClick={() => onClickLeaderboardHandler()}>Show leads</Button>
            {gettingLeaderboardLoading && <p>Loading...</p>}
            {gettingLeaderboardHasError ?
                <p>{gettingLeaderboardError}</p> : 
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Age</th>
                            <th>Cult</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    {/* These is hardcoded because receving format from sc is Array[Array(Candidate) without field name]  and the length is 3*/}
                    {leaderboardData && leaderboardData.response && leaderboardData.response.map((d, index) =>{
                        return <tbody key={index}>
                                <tr>
                                    <td>{index}</td>
                                    <td>{d[0]}</td>
                                    <td>{d[1]}</td>
                                    <td>{d[2]}</td>
                                    <td>{d[3]}</td>
                                </tr>
                            </tbody>
                    })}
                </Table>
            }
        </>
    )
}

export default Leaderboard;