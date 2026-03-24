import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send({ title: "get all users" }));
userRouter.get("/:id", (req, res) => res.send({ title: "get users detail" }));
userRouter.post("/", (req, res) => res.send({ title: "post users" }));
userRouter.patch("/:id", (req, res) => res.send({ title: "patch users" }));
userRouter.delete("/:id", (req, res) => res.send({ title: "delete users" }));

export default userRouter;
