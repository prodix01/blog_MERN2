const Validator = require("validator");
const isEmpty = require("./is-empty");


module.exports = function validateProfileInput(data) {

    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";

    if (!Validator.isLength(data.handle, {min : 2, max : 30})) {
        errors.handle = "Handle must be between 2 and 30 characters"
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = "Handle field is required"
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "Status field is required"
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = "Skills field is required"
    }

    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = "Not a valid URL"
        }
    }

    return {
        errors,
        isValid : isEmpty(errors)
    };

};