import { request, response, Router } from "express";
import { query , validationResult , checkSchema, matchedData } from "express-validator";
import { mockUsers } from "../constants.js";
import { resolveFindUserIndex } from "./middleware.js";
import { createUserValidationSchema } from "../Validation/utils/validationSchema.js";



const router = Router();

// we are creating the all the user related routes here

router.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be Empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Length must be bw 3 and 10"),

  (request, response) => {
    const result = validationResult(request);
      console.log(result);
      
      const { query: { filter, value } } = request
      
      if (filter && value) {
          let findUser = mockUsers.filter((user) => user[filter].includes(value))
          return response.send(findUser)
      }
      else {
          return response.send(mockUsers)
      }
    
  }
);


router.get("/api/users/:id", resolveFindUserIndex, (request, response) => {
  const { findUserIndex } = request  
  
  const findUser = mockUsers[findUserIndex]

  response.send(findUser)
});


router.post("/api/users", checkSchema(createUserValidationSchema), (request, response) => {
  const { body } = request
  const result = validationResult(request)
  console.log(result);

  if(!result.isEmpty()) return response.sendtatus(400).send({errors : result.array()})
  
  const data = matchedData(request)
  mockUsers.push({ id: mockUsers.length + 1, ...data })
  
  response.send(mockUsers)
})

router.put("/api/users/:id", resolveFindUserIndex, (request, response) => {
  const { findUserIndex , body } = request
  
  mockUsers[findUserIndex] = { id : findUserIndex , ...body}

  response.send(mockUsers) 

})

router.patch("/api/users/:id", resolveFindUserIndex, (request, response) => {
  const { findUserIndex, body } = request
  
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex] , ...body }

  response.send(mockUsers)
})

router.delete("/api/users/:id", resolveFindUserIndex, (request, response) => {
  const { findUserIndex } = request
  
  mockUsers.splice(findUserIndex , 1)
  
  response.send(mockUsers)

} )

export default router
 
// we can group the routes this way
// we can create the routers folder and group them together