const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://arjunkrishnakr17:Arjun%40123@cluster0.sdfcpi3.mongodb.net/my-todo");

const userSchema=mongoose.Schema({
    "username":String,
    "password":String,
    "firstname":String
})

const adminSchema=mongoose.Schema({
    "username":String,
    "password":String,
    "firstname":String
})

const myTodoSchema=mongoose.Schema({
    "title":String,
    "description":String,
    "completed":Boolean,
    "user":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

 const User=mongoose.model("user",userSchema);
 const Admin=mongoose.model("admin",adminSchema);
 const MyTodos=mongoose.model("myTodos",myTodoSchema);

 module.exports={User,Admin,MyTodos};