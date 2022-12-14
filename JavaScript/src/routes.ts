import { Router } from "express";

const route = Router();
const books: { title: string; author: string }[] = [];

route.get("/", (req, res) => {
  res.send("Hello from expres");
});

route.get("/book", (req, res) => {
  return res.json(books);
});

route.post("/book", (req, res) => {
  const body = {
    title: req.body.title,
    author: req.body.author,
  };
  books.push(body);
  return res.json({ book: body });
});

export default route;
