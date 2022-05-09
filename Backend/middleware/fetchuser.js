const jwt = require('jsonwebtoken');

function fetchuser(req,res,next) {
    const token = req.headers['authorization'];
    if(token == null) return res.sendStatus(401).json({error: "Please Enter a valid Token"});

    jwt.verify(token,process.env.JWT_SECRET,(err,userData)=>{
        if(err) return res.sendStatus(403).json({error: "Access Denied"});
        req.user = userData.user;
    });
    
    next();
}

module.exports = fetchuser;