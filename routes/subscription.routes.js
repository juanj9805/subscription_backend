import { Router } from "express";

const subsccriptionRouter = Router();

subsccriptionRouter.get("/", (req, res) => res.send({ title: "get all subs" }));
subsccriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "get subs by id" }),
);
subsccriptionRouter.post("/", (req, res) => res.send({ title: "create subs" }));
subsccriptionRouter.patch("/:id", (req, res) =>
  res.send({ title: "patch sub" }),
);
subsccriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "delte sub" }),
);
subsccriptionRouter.get("/user/:id", (req, res) =>
  res.send({ title: "get all users subs" }),
);
subsccriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "cancel subs" }),
);
subsccriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "get renewals" }),
);

export default subsccriptionRouter;
