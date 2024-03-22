import express, { response } from "express"

const app = express();

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


// Query Parameters
// localhost:3000/products?key1=value1&key2=value2
app.get("/api/users", (request, response) => {
    console.log(request.query);
    const { filter, value } = request.query
    console.log(filter , value);
    
    //only if both params are present
    if (filter && value) {
         
        const arr = mockUsers.filter((user) => user[filter].includes(value))
        if (arr.length>0) {
            return response.send(arr)
        }
        return response.sendStatus(404)
    }
    
    return response.send(mockUsers)
})


// Route Parameters 
// localhost:3000/products/4
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


