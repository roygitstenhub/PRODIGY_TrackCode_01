import express from "express"
import {
    handleRegister,
    handleLogin,
    handleLogout,
    getUserProfile,
    updateUserProfile
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router()

//@post routes
router.post("/logout", handleLogout)

router.route("/profile").get(isAuthenticated, getUserProfile).put(isAuthenticated, updateUserProfile)

//@Post routes 
router.post("/", handleRegister)

router.post("/login", handleLogin)


export default router
