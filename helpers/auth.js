const jwt = require('jsonwebtoken');

//! if the token is comming from authorization header

// let authorization=async (req,res,next)=>
// {
//     try
//     {
//           console.log("object")
//         let token=req.headers.authorization;//!false

//         if(!token || !token.startsWith("Bearer") )
//         {
//             throw new Error("Token Required");
//         }

//         token=token.split(" ")[1]
//         let decoded=jwt.verify(token, "123")
//         req.user=decoded;
      
//         next()
//     }
//     catch(err)
//     {
//         next(err)
//     }
// }

//! when the token is coming from cookies
let authorization=async (req,res,next)=>
    {
        try
        {
              
            let token=req.cookies.token;//!false
    
            if(!token)
            {
                throw new Error("Token Required");
            }
    
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