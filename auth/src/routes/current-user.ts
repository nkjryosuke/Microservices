import express from "express";

import { currentUser } from "@summerivetickets/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null }); //req.currentUserが存在しない場合にundefinedになるのを防止する。
});

export { router as currentUserRouter };
