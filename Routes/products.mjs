import {  Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
    response.send([
        { id: 1, name: "abc", price: 200 },
        { id: 2, name: "xyz", price: 300 },
        {id : 3, name : "lbw" , price : 250}
    ])
})

export default router