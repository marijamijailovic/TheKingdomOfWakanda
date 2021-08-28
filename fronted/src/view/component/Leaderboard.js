import React from "react";
import {Table } from "react-bootstrap";

const Leaderboard = (props) => {
    return (
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
                {props.leadersData && props.leadersData.map((data, index) =>{
                    return <tbody key={index}>
                            <tr>
                                <td>{index}</td>
                                <td>{data[0][0]}</td>
                                <td>{data[0][1]}</td>
                                <td>{data[0][2]}</td>
                                <td>{data[1]}</td>
                            </tr>
                        </tbody>
                })}
            </Table>
    )
}

export default Leaderboard;