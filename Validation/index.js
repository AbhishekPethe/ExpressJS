import express, { request, response } from "express"
import { query , validationResult , body , matchedData , checkSchema} from "express-validator"
import { createUserValidationSchema } from "./utils/validationSchema.js"

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})

const resolveFindUserIndex = (request, response, next) => {
    const { params: { id } } = request
    const paramsID = parseInt(id)

    if (isNaN(paramsID)) return response.sendStatus(400)
    
    const findUserIndex = mockUsers.findIndex((user) => user.id === paramsID)
    if (findUserIndex === -1) return response.sendStatus(404)
    
    request.findUserIndex = findUserIndex
    next();
}



const mockUsers = [
    { id: 1, username: "anson", displayName: "Anson" },
    { id: 2, username: "jack", displayName: "Jack" },
    { id: 3, username: "adam", displayName: "Adam" },
    { id: 4, username: "tina", displayName: "Tina" },
    { id: 5, username: "jason", displayName: "Jason" },
    { id: 6, username: "henry", displayName: "Henry" },
    { id: 7, username: "marilyn", displayName: "Marilyn" },
];


app.get("/api/users",
    
    // we are validating the queries here 
    query("filter")
        .isString()
        .notEmpty().withMessage("Must not be Empty")
        .isLength({ min: 3, max: 10 }).withMessage("Length must be bw 3 and 10"),
    
    (request, response) => {
        const result = validationResult(request)
        console.log(result);
        
        
    response.send(mockUsers)
})

app.get("/api/users/:id", resolveFindUserIndex ,(request, response) => {
    const { findUserIndex } = request
    
    const findUser = mockUsers[findUserIndex]

    return response.send(findUser)
})



// body parameter 
// 1st way

app.post(
  "/api/users",
  body("username")
    .notEmpty().withMessage("Username cannot be empty")
    .isLength({ min: 5, max: 32 }).withMessage("Username length must be bw 5 to 32")
        .isString().withMessage("Username must be string"),
  body("displayname").notEmpty().withMessage("Displayname cannot be empty"),
  
  (request, response ) => {
      const { body } = request;
      const result = validationResult(request)
      console.log(result);

      //check if there are any errors
      if(!result.isEmpty()) return response.status(404).send({ errors : result.array()})

      // get the data that passed through the validator
      const data = matchedData(request)
      console.log(data); 
       
      mockUsers.push({ id: mockUsers.length + 1, ...data });

    response.send(mockUsers);
  }
);


// 2nd way with schema

app.post(
    "/api/users",
    
    checkSchema(createUserValidationSchema),

    (request, response ) => {
        const { body } = request;
        const result = validationResult(request)
        console.log(result);
  
        //check if there are any errors
        if(!result.isEmpty()) return response.status(404).send({ errors : result.array()})
  
        // get the data that passed through the validator
        const data = matchedData(request)
        console.log(data); 
         
        mockUsers.push({ id: mockUsers.length + 1, ...data });
  
      response.send(mockUsers);
    }
  );


