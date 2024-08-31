import express, { Router } from "express";
import { UserInfo } from "remult";


//demo DB for testing
const validUsers: UserInfo[]=[
{id:"1",name:"Nati"},
{id:"2",name:"Nir"},
{id:"3",name:"Maor"},
{id:"4",name:"Eden"},

];

export const auth = Router();
auth.use(express.json());                 //json parsing/casting to body to json template

//sign in request/function
auth.post("/api/signIn",(req,res)=>{
const user=validUsers.find((user)=>user.name===req.body.username);//find users in DB
if(user){
    console.log(user);
req.session!["user"]=user;//update the current user
res.json(user);
}else{
    console.log("didn't enter user name");
    res.status(404).json("Invalid user");
}
});

//sign out request/function
auth.post("/api/signOut",(req,res)=>{
    req.session!["user"]=null;
    res.json("ok");
});

//return cuurent user to front end
auth.get("/api/currentUser",(req,res)=>res.json(req.session!["user"]));