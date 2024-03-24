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
    console.log(`Server is running on PORT ${PORT}`);
})

app.get("/api/users", (request, response) => {
    response.send(mockUsers)
})

app.get("/api/users/:id", (request, response) => {
    const { body, params: { id } } = request
    const paramsID = parseInt(id)
    
   

    if (isNaN(paramsID)) return response.send(400)
    
    const findUser = mockUsers.find((user) => user.id === paramsID)

    if (!findUser) return response.sendStatus(404)
    
    return response.send(findUser)

})

app.delete("/api/users/:id", (request, response) => {
    const { body, params: { id } } = request
    
    const paramsID = parseInt(id)

    if (isNaN(paramsID)) return response.sendStatus(400)

    const findUserIndex = mockUsers.findIndex((user) => user.id === paramsID)
    
    if(findUserIndex === -1) return response.sendStatus(404)

    const deleteItem = mockUsers.splice(findUserIndex, 1)
    
    response.send(deleteItem)

})
