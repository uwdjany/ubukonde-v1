import { Router } from "express";
import createNewUsers from "../controller/userController";
import loginApi from "../controller/userController";
import allUserApi from "../controller/userController";
import deleteAllUser from "../controller/userController"

const router = Router();

router.post("/user/create", createNewUsers.createNewUser);
router.post("/user/login", loginApi.loginUser);
router.get("/user", allUserApi.allUser);
router.delete("/delete/user", deleteAllUser.deleteAll)

export default router;
