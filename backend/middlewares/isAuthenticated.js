import jwt from "jsonwebtoken";

// Middleware: verifies the JWT stored in the "token" cookie and attaches
// the decoded user's ID to req.id for downstream route handlers
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        // Verify and decode the JWT using the server's secret key
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        // Attach the decoded user ID to the request for use in downstream controllers
        req.id = decode.userId;
        next();
    } catch (error) {
        // Note: if jwt.verify() throws (e.g. expired or malformed token), execution lands here,
        // but no error response is sent — only logged — so the request hangs rather than
        // returning a clean 401 in that case
        console.log(error);
    }
}
export default isAuthenticated;
