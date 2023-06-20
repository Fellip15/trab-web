import React from "react";

const Message = ({ message }) => {
    return (
        <div className="message">
            <p className="message-text">
                {message}
            </p>
        </div>
    );
};

export default Message;