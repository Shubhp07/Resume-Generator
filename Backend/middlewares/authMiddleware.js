import { auth, JWT } from "google-auth-library";

const authMiddleware = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({error:"No token provided"});
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwtDecode.verify(token,process.envJWT_SECRET);

        req.user = {
            id: decoded.userId || decoded.id || decoded._id,
            email: decoded.email,
            role:decoded.role
        };
        next();
    }catch(err){
        console.error("Auth middleware error: ", err.message);
        return res.status(401).json({error:"Invalid or expires token"});
        
    }
};

export default authMiddleware;