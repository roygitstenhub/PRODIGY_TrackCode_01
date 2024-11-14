import jwt from "jsonwebtoken"
import User from "../model/user.js"
import expressAsyncHandler from "express-async-handler"

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
    let token
    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // @except passord select all data
            req.user = await User.findById(decoded.userId).select("-password")
            next()

        } catch (error) {
            res.status(401).json({
                message: "Not authorized, token failed"
            })

        }

    } else {
        res.status(401).json({
            message: "Not authorized, no token"
        })
    }

})

export { isAuthenticated }