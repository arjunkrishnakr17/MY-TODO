const jwt=require("jsonwebtoken");
const { usernameSchema, passwordShema } = require("../zod");
const jwt_password="123";

function jwt_sign(username)
{
    const token=jwt.sign(username,jwt_password)
    //localStorage.setItem('token', jwtToken);
    return token;
}

function jwtAuthentication(req,res,next)
{
    const token=req.headers.authorization;

    try{
        if(jwt.verify(token,jwt_password))
            {
                next()
            }
    }catch(err)   
    {
        console.log("jwt error")
        res.send("error::"+err)
    }
}

function jwtDecode(token)
{
    const username=jwt.decode(token,jwt_password);
    return username;
}

function zodValidation(req,res,next)
{
    const username=req.body.username;
    const password=req.body.password;
    const validatedUsername=usernameSchema.safeParse(username);
    const validatedPassword=passwordShema.safeParse(password);
    if (!validatedPassword.success && !validatedUsername.success)
    {
        res.status(404).json({"msg":"criteria not met for username or password"})
    }
    else{
        next()
    }
}
module.exports={jwt_sign,jwtAuthentication,jwtDecode,zodValidation};