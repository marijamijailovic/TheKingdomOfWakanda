import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { globalConstants } from "../../constants/global";
import {  candidatesData, candidatesHasErrors, candidatesLoading, candidatesError } from "../../redux/slices/candidatesSlice";
import { getWinningCandidates } from "../../redux/actions/candidatesActions";
import Message from "./Message";

const Leaderboard = (props) => {
    const dispatch = useDispatch();

    const gettingLeaderboardLoading = useSelector(candidatesLoading);
    const gettingLeaderboardHasError = useSelector(candidatesHasErrors);
    const leaderboardData = useSelector(candidatesData);
    const gettingLeaderboardError = useSelector(candidatesError);

    useEffect(() => {
        dispatch(getWinningCandidates());
    }, [dispatch])

    return (
        <>
            <h3>Winners candidate</h3>
            {gettingLeaderboardLoading && <Message message={globalConstants.LOADING}/>}
            {gettingLeaderboardHasError ?
                <Message message={gettingLeaderboardError}/> : 
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
                    {/* These is hardcoded because receving format from sc is Array without field name and the order is name, age,cult, score*/}
                    {leaderboardData.response && leaderboardData.response.map((d, index) =>{
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