import pkg from "jsonwebtoken";
import User from "../models/User.js";

const { verify } = pkg;

export const authGuard = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];

            const { id } = verify(token, process.env.JWT_token);

            req.user = await User.findById(id).select("-password");

            next();
        } catch (error) {
            const err = new Error("Not authorized, token failed");
            err.statusCode = 401;
            next(err);
        }
    } else {
        let error = new Error("Not authorized, No token");
        error.statusCode = 401;
        next(error);
    }
};

export const adminGuard = (req, res, next) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        let error = new Error("Not authorized as an admin");
        error.statusCode = 401;
        next(error);
    }
};
