import express, { request, response } from "express";
import { query } from "express-validator";
import usersRouter from "./users.mjs";
import productRouter from "./products.mjs"

const app = express();

app.use(express.json());

// using the user route
app.use(usersRouter)

// using the product route
app.use(productRouter)


// another method :Rather than importing one router at a time in main file ,  we can create an index file for importing all the routes there
// then we can export that file in the main src index file and use it like this
// in the routes index file ==> router.use(userRouter) , router.use(productsRouter)
// and then in main index file ==> app.use(routes)

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
})


 