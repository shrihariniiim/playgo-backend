const authorizeRoles=(...allowedRoles)=>{

  return (req, res, next) => {
   if(!allowedRoles.includes(req.user.role)){
      return res.status(403).json({message:`Role ${req.user.role} is not allowed to access this route`});
   }
    next();
};
};

export default authorizeRoles;
// This function is a middleware that checks if the user has the required roles to access a route.