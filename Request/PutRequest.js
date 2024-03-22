// PUT
// when put req is used , the entire obj is updated , lets if we need to only change the username but the displayname will also be overriden and be null , thus we need to specify non-updating fields as well in order to prevent this from happening

import express from "express"

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

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

app.put("/api/users/:id", (request , response) => {
    const { body ,
    params : { id },
    } = request
    
    const parsedID = parseInt(id)
    console.log(request.params.id , request.body);
    
    if (isNaN(parsedID)) return response.sendStatus(400)
    
    // check whether obj we need to modity is present or not
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedID)
    if (findUserIndex === -1) return response.sendStatus(404)
    
    // updating the obj
    mockUsers[findUserIndex] = { id:parsedID , ...body}
    console.log(mockUsers);
    return response.sendStatus(200)
})

app.get("/api/users/:id", (request, response) => {
    const { params : {id}} = request
    const paramsID = parseInt(id)
    const obj = mockUsers.find((user) => user.id === paramsID)

    response.send(obj)
})
