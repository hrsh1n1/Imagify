import jwt from 'jsonwebtoken'

const userAuth = async( req, res, next) => {
    

    const token = req.headers.token;

    if(!token){
        return  res.json({success:false, message: 'No token, authorization denied'})
    }

    
    try{
        const tokenDecode= jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecode.id){
            if(!req.body){
                req.body = {};
            }
            req.body.userId = tokenDecode.id
        }
        else{
            return res.json({success:false, message: 'Not authorized, login again'})
        }

        next();


    } catch(error){
        res.json({success:false, message: error.message})
    }
};

export default userAuth;