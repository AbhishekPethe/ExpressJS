// Patch request allloes us to update the record partially

import express, { request, response } from "express"

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

const mockUsers = [
    { id: 1, username: "anson", displayName: "Anson" },
    { id: 2, username: "jack", displayName: "Jack" },
    { id: 3, username: "adam", displayName: "Adam" },
    { id: 4, username: "tina", displayName: "Tina" },
    { id: 5, username: "jason", displayName: "Jason" },
    { id: 6, username: "henry", displayName: "Henry" },
    { id: 7, username: "marilyn", displayName: "Marilyn" },
];
  
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})

app.get("/api/users/:id", (request, response) => {
    console.log(request.params); 
    const paramsId = parseInt(request.params.id)

    if (isNaN(paramsId)) return response.status(400).send({msg : "Bad Request , Invalid ID"})

    const findUser = mockUsers.find((user) => user.id === paramsId)
    if (!findUser) {
         response.sendStatus(404)
    }
    return response.send(findUser)
})


app.patch("/api/users/:id", (request, response) => {
    const { body, params: { id } } = request
    
    console.log(body , id);

    const paramsID = parseInt(id)
    if (isNaN(paramsID)) return response.sendStatus(400)
    
    const findUserIndex = mockUsers.findIndex((user) => user.id === paramsID)

    if (findUserIndex === -1) return response.sendStatus(404)

    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex] , ...body }
    
    response.send(mockUsers)
    
})