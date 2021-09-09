import React from "react";

const Message = (props) => {
    const {message} = props;
    return (
        <div>
            {message}
        </div>
    );
};

export default Message;