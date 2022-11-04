import { Router } from "express";
import controller from "./controller.js";

const likes = new Router();

// path: /users
likes.post("/", controller.like);
likes.get("/", controller.getLikes);

export default likes;
