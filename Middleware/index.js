import express, { request, response } from "express"

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

const logginMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
}

const resolveFindUserIndex = (request , response , next) => {
    const { params: { id } } = request
    const paramsID = parseInt(id)

    if (isNaN(paramsID)) return response.sendStatus(400)
    
    const findUserIndex = mockUsers.findIndex((user) => user.id === paramsID)
    if (findUserIndex === -1) return response.sendStatus(404)
    
    // attaching the findUserIndex for further use 
    request.findUserIndex = findUserIndex
    next();
}

// applying globally
// app.use(logginMiddleware)



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

// app.get("/api/users", (request, response) => {
//     response.send(mockUsers)
// })


// applying it specifically and a custom middleware

// 1
app.get("/api/users",
    //middleware
    (request, response, next) => {
        console.log(request.url);
        // we can have as many middleware func as we want , but if we dont specify next() function , control won't go to the next function
        next();
        },
    (request, response) => {
    response.send(mockUsers)
    })

app.get("/api/users/:id", resolveFindUserIndex, (request, response) => {
    const { findUserIndex } = request
    
    const findUser = mockUsers[findUserIndex]

    response.send(findUser)

})

// 2 //put request with middleware
app.put("/api/users/:id", resolveFindUserIndex, (request , response) => {
    const { findUserIndex, body } = request
    
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body }
    
    response.send(mockUsers)

})

// 3 //delete request with middleware

app.delete("/api/users/:id", resolveFindUserIndex, (request, response) => {
    const { findUserIndex } = request
    
    mockUsers.splice(findUserIndex , 1)
    
    response.send(mockUsers) 

})