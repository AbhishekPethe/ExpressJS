export const createUserValidationSchema = {
    username: {
        isLength: {
            options: {
                min: 5,
                max : 32
            },
            errorMessage : "Length must be bw 5 and 32"
        },
        notEmpty: {
            errorMessage : "username must not be empty"
        },
        isString: {
            errorMessage : "username must be a string"
        }
    },
    displayname: {
        //cuz there was no error msg 
        notEmpty : true
    }
}

