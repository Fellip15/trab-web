exports.isEmpty = (val) => {
    if(val === undefined || val === null) {
        return true;
    } else if(val === "") {
        return true;
    }
    return false;
};