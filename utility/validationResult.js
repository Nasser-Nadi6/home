function validationResult(result) {
    if(!result[0]){
        return "user_not_found"
    } else if(result[0].includes('invalid')){
        return "validation_err"
    } else {
        return "ok"
    }
}


module.exports = {
    validationResult
}