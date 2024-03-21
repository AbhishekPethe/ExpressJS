import express, { response } from "express"

const app = express();

const PORT = process.env.PORT || 3000

const mockUsers = [
    { id: 1, name: "a", age: 20 },
    { id: 2, name: "b", age: 21 },
    {id : 3, name : "c" , age : 22}
]

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})

app.get("/", (request , response) => {
    // response.send("Hello World !")
    response.status(200).send({msg : "Hello with Object"})
})



app.get("/api/products", (request, response) => {
    response.send([
        { id: 1, name: "abc", price: 200 },
        { id: 2, name: "xyz", price: 300 },
        {id : 3, name : "lbw" , price : 250}
    ])
})

app.get("/api/users", (request , response) => {
    response.send([
        { id: 1, name: "a", age: 20 },
        { id: 2, name: "b", age: 21 },
        {id : 3, name : "c" , age : 22}
    ])
})


// Route Parameters 
app.get("/api/users/:id", (request , response) => {
    console.log(request.params); // {id : '1'} , notice that id is in string form
    const paramsId = parseInt(request.params.id)

    //check if params is num or string 
    if (isNaN(paramsId)) return response.status(400).send({msg : "Bad Request , Invalid ID"})
    
    //simple method
    // let findUser = mockUsers.filter((each) => {
    //     return each.id == paramsId
    // })
    
    //going deep
    const findUser = mockUsers.find((user) => user.id === paramsId)
    if (!findUser) {
         response.sendStatus(404)
    }
    return response.send(findUser)
})


// Query Parameters
// localhost:3000/products?key1=value1&key2=value2