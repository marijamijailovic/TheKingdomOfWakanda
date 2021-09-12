import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { winners} from "../../../redux/slices/candidatesSlice";
import { getWinningCandidates } from "../../../redux/thunks/candidatesThunks";

const Leaderboard = (props) => {
    const dispatch = useDispatch();

    const leaderboardData = useSelector(winners);

    useEffect(() => {
        dispatch(getWinningCandidates());
    }, [dispatch])

    return (
        <>
            <div className = "notice">
                Congrats, you successfully voted!! <br/>    
                You can now see current 3 leading candidates who will represent Wakanda!
            </div>
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
                    {leaderboardData.result && leaderboardData.result.map((d, index) =>{
                        return <tbody key={index}>
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{d[0]}</td>
                                    <td>{d[1]}</td>
                                    <td>{d[2]}</td>
                                    <td>{d[3]}</td>
                                </tr>
                            </tbody>
                    })}
                </Table>
        </>
    )
}

export default Leaderboard;