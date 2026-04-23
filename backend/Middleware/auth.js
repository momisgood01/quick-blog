import jwt from "jsonwebtoken";


const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try{
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    }catch(error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}

export default auth;