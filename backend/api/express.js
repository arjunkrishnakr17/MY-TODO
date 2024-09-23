const {User,Admin,MyTodos}=require("./db");
const express=require("express");
const { jwt_sign, jwtAuthentication, jwtDecode, zodValidation } = require("./middleware");
const app=new express();
app.use(express.json());
const cors=require("cors");
app.use(cors());

app.get("/hello",(req,res)=>
{
    res.send("hello world")
})

app.listen(3000)

app.post("/mytodos/signup",zodValidation,(req,res)=>
{
    const username=req.body.username;
    const password=req.body.password;
    User.create({
        username,
        password
    }).then(()=>{
        const token=jwt_sign(username);
        res.json({"token":token});
    }
    ).catch((err)=>
    {
        res.status(500).json({
            "msg":"error"
        })
    })
})

app.post("/mytodos/signin/",zodValidation,(req,res)=>
    {
        const username=req.body.username;
        const password=req.body.password;
        User.findOne({
            username,
            password
        }).then(function(data)
    {
        console.log(data);
        if (data!=null)
        {
        const token=jwt_sign(username);
        console.log("token created");

        res.status(200).json({"token":token});
        }
        else
        {
           res.json({"msg":"invalid user"}); 
        }
    }).catch(function(err)
    {
        res.status(400).json({"msg":"invalid user"}); 
    })
    })

app.get("/mytodos",jwtAuthentication,async function(req,res){

    const token=req.headers.authorization;
    const username=jwtDecode(token);
    const user=await User.findOne({username});
    console.log(username+" from /mytodos");
    MyTodos.find({user:user._id}).then(function(data){
        res.status(200).send(data);
        console.log("helo");
    }).catch(err=>
    {
        res.status(500).json({"msg":"error::"+err});
    }
    )

})

app.post("/mytodos/createtodo",jwtAuthentication,async function(req,res)
{
    const title=req.body.title;
    const description=req.body.description;
    const completed=req.body.completed;
    const token=req.headers.authorization;
    const username=jwtDecode(token);
    console.log(username);
    const user=await User.findOne({username});
    console.log(user);
    MyTodos.create({
        title,
        description,
        completed,
        user:user._id
    }).then(function()
{
    res.status(200).json({"msg":"new todo created"})
}).catch((err)=>
{
    res.status(500).json({"msg":"error"+err})
})

})

app.use((err,req,res,next)=>
{
    console.log(err);
    res.status(500).json({"msg":"error happened"+err});
})

app.put("/mytodos",jwtAuthentication,async function(req,res)
{
    const id=req.body.id;
    const completed=req.body.completed;
    MyTodos.findOneAndUpdate({_id:id},{completed:completed}).then((data)=>{
        res.status(200).json({"msg":"todo updated"});
    }).catch(err=>{
        res.status(500).json({
            "msg":"error in updating todo"+err
        })
    })

})

app.delete("/mytodos",jwtAuthentication,async (req,res)=>
{
    const token =req.headers.authorization;
    const username=jwtDecode(token);
    const user=await User.findOne({username});
    const id=user._id;

    MyTodos.deleteMany({
        user:id
    }).then((data)=>
{
    res.status(200).json({"msg":data})
})
})