import React from "react";
import { Alert } from "react-bootstrap";
import { globalConstants } from "../../constants/global";

const Message = (props) => {
    const {data} = props;
    
    if (data.error) {
        return <Alert variant="danger">{data.error}</Alert>
    }

    if (data.reason) {
        return <Alert variant="warning">{data.reason}</Alert>
    }

    if (data.response && data.response.transactionHash) {
        return <Alert variant="success">{`${globalConstants.SUCCESS} transaction hash is ${data.response.transactionHash}`}</Alert>
    }

    return <></>
};

export default Message;