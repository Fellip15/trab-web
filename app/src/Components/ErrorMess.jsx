import React from "react";

const ErrorMess = ({ hidden, message }) => {
    
    const styleHidden = hidden === true ? {display: 'none'} : {};
    return (
        <div className="error-message" style={styleHidden}>
            <p className="error-message-text">
                {message}
            </p>
        </div>
    );
};

export default ErrorMess;