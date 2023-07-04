exports.isEmpty = (val) => {
    if(val === undefined || val === null || val === "undefined") {
        return true;
    } else if(val === "") {
        return true;
    }
    return false;
};