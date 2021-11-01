import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  startGithubLogin,
  callbackGithubLogin,
  getChangepassword,
  postChangePassword,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangepassword)
  .post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/callback", publicOnlyMiddleware, callbackGithubLogin);
userRouter.get(":id", see);

export default userRouter;
