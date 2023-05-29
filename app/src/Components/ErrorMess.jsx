import React from "react";

const ErrorMess = ({ message }) => {
    return (
        <div className="error-message">
            <p className="error-message-text">
                {message}
            </p>
        </div>
    );
};

export default ErrorMess;