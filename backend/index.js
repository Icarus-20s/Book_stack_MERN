import express from "express";
import { PORT, uri } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());
//middleware for handlingh cors
/*app.use(cors(
  {
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-type']
  }
));*/

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack");
});

app.use("/books", booksRoute)

mongoose
  .connect(uri)
  .then(() => {
    console.log("App connected to the database");

    app.listen(PORT, () => {
      console.log("App is running on port:", PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
