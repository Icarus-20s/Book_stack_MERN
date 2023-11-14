import express from 'express';
import { Books } from '../models/bookModel.js'
const router = express.Router();


//Route to save book
router.post("/books", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "send all required fields : title , author, publishYear",
        });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
      const books = await Books.create(newBook);
      return response.status(201).send({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //Route to get all books
  router.get("/", async (request, response) => {
    try {
      const books = await Books.find({});
      return response.status(200).json(books);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  //Route to get one book by id
  router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const book = await Books.findById(id);
      return response.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //Update books
  router.put("/:id", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: " Send all the required fields : title , author , publishYear",
        });
      }
      const { id } = request.params;
      const result = await Books.findByIdAndUpdate(id, request.body);
      if (!result) {
        return response.status(404).send({
          message: "Book not found",
        });
      }
      return response.status(200).send("Book updated successfully");
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: error.message });
    }
  });
  //route to delete book
  router.delete("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const result = await Books.findByIdAndDelete(id);
      if (!result) {
        return response.status(404).json({ message: "book Not Found" });
      }
      return response.status(200).send({
        message: "Book deleted successfully",
      });
    } catch (error) {
      console.log(error);
      response.status(500).send({
        message: "Book Not Found",
      });
    }
  });
  
  export default router;