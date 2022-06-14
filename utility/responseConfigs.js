const ResponseStatusCodes = Object.freeze({
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    FORBIDDEN: 403
})

const ResponseMessages = Object.freeze({
    EmployeeExist: "employee id is already exist.",
    SuccessfullyStored:'Data stored successfully.',
    MissingRequiredFields:"Missing required field(s)-(id,data and parentId are required!)",
    InvalidEmail:"Email is invalid"
})

const ResponseStatus = Object.freeze({
    OK: "Success",
    ERROR: "Error",
    BAD_REQUEST:"Bad_Request"
})

module.exports = {
    ResponseStatusCodes, ResponseMessages, ResponseStatus
}