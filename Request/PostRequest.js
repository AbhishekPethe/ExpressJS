import express, { request, response } from "express"

const app = express()

//middleware for processing data
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
  

app.post("/api/users", (request, response) => {
    console.log(request.body);
    const { body } = request
    const newUser = { id: mockUsers.length + 1, ...body }
    mockUsers.push(newUser)
    return response.status(201).send(newUser)
})

app.listen(PORT, () => {
    console.log(`Process running on PORT ${PORT}`);
})