const jwt = require('jsonwebtoken');


let authorization=async (req,res,next)=>
{
    try
    {
          console.log("object")
        let token=req.headers.authorization;//!false

        if(!token || !token.startsWith("Bearer") )
        {
            throw new Error("Token Required");
        }

        token=token.split(" ")[1]
        let decoded=jwt.verify(token, "123")
        req.user=decoded;
      
        next()
    }
    catch(err)
    {
        next(err)
    }
}

module.exports=authorization