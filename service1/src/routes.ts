import { Router } from "express";

const route = Router();
const books: { title: string; author: string }[] = [];

route.get("/", (req, res) => {
  res.send("Hello from expres");
});
route.get("/first", (req, res) => {
  return res.send("hi");
});
route.get("/second", (req, res) => {
  return res.send("hi");
});
route.get("/third", (req, res) => {
  return res.send("hi");
});
route.get("/fourth", (req, res) => {
  return res.send("hi");
});
route.get("/fifth", (req, res) => {
  return res.send("hi");
});
route.get("/sixth", (req, res) => {
  return res.send("hi");
});
export default route;
