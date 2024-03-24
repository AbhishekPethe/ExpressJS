=== Validation ===

- query("filter").isString().notEmpty().....

- Above is the chain reaction

- Thing is when there is a error , we dont know from which validator its coming from 

- That's where the withMessage() method comes

- withMessage() method sets the error message for the previous validator
