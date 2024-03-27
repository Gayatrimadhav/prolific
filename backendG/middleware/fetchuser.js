var jwt=require('jsonwebtoken');
const JWT_SECRET='gayatripsk';

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"please auth using valid tyoken"})
    }
    try {
        const data =jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next()
        
    } catch (error) {
        res.status(401).send('internal server some error occured');
    }
    
}
module.exports=fetchuser;