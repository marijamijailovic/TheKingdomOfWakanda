import React from "react";
import { Alert } from "react-bootstrap";
import { globalConstants } from "../../constants/global";
import { isString } from "underscore";

const Message = (props) => {
    const {data} = props;
    
    if (data.error) {
        return <Alert variant="danger">{data.error}</Alert>
    }

    if (isString(data.result)) {
        return <Alert variant="warning">{data.result}</Alert>
    }

    if (data.result && data.result.transactionHash) {
        return <Alert variant="success">{`${globalConstants.SUCCESS} transaction hash is ${data.result.transactionHash}`}</Alert>
    }

    return <></>
};

export default Message;