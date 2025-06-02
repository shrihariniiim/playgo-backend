//protecting routes using middleware
import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
  let token ;
  let authHeader=req.headers.Authorization||req.headers.authorization;
  if(authHeader&&authHeader.startsWith("Bearer")){
    token=authHeader.split(" ")[1];
    if (!token) {
      return res
      .status(401)
      .json({ message: 'No token provided' });
    }
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("decoded",req.user);
      next();
    } catch (error) {
      return res
        .status(403)
        .json({ message: 'Invalid token' });
    }
  }

  
};

export default verifyToken;

//next is for calling the next middleware
//protecting routes using middleware