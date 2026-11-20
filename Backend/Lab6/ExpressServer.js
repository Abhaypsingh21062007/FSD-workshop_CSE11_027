import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import Student from "./Models/students.js";
dotenv.config();
connectDB();

const app=express()
const port=7000
app.use(express.json())
const arr = [
    {
        id: 111,
        name: "ABhi",
        dept: "Cse",
        classs: "Cse11",
    },
    {
        id: 102,
        name: "Abhitansu",
        dept: "Cse",
        classs: "Cse11",
    },
    {
        id: 101,
        name: "sonkar",
        dept: "Cse",
        classs: "Cse13",
    },
];
const registeredData=[];
app.get("/",(req,res)=>{

    res.status(200).json({
        message:"Welcome to Server",
        arr
    })
})
app.get("/user",(req,res)=>{
    try{
        res.status(200).json({
        message:"Welcome to Server",
        arr
    })
    }
    catch(error){
        console.log(`error found: ${error}`)
    }
})


app.post("/create",(req,res)=>{
    try{
        const{id,name,dept,classs}=req.body;
        const newUser={
            id,
            name,
            dept,
            classs,
        };
        arr.push(newUser);
        res.status(200).json({message:"user created sucessfully",newUser});
    }catch(error){
        console.log(`Error message ${error}`)
    }
})
app.get("/registered",(req,res)=>{
    res.status(200).json({
        users:registeredData,
    });
    // res.end(JSON.stringify(arr))
});
// app.get("/registered",(res,req)={

// // })
// app.delete()

app.post("/test-db", async (req, res) => {
    try {
        const student = await Student.create({
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            course: "MERN Stack",
        });

        res.status(201).json({
            message: "Data inserted successfully!",
            data: student,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});


app.get("/test-db",async (req,res)=>{
    try {
        const students=await Student.find();
        res.status(200).json(students);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});


app.get("/user/:id",(req,res)=>{
    try{
    const id=req.params.id;
    const search=arr.find((u)=>u.id==id);
    if(!search){
        return res.status(404).json({message:"Not found in array"});
    }
    // arr.splice(userId,1);
    arr.slice(id,1)
    return res.status(200).json({message:"Executed",id})
}
catch(error){
    console.log(`Message : ${error}`)
}
})
app.put("/edit/:id",(req,res)=>{
    try{
    const id=parseInt(req.params.id);
    const {name,dept,classs}=req.body;
    const search=arr.findIndex((u)=>u.id==id);
    if(search==-1){
        return res.status(404).json({message:"Not found in array"});
    }
    arr[search]={
        id:arr.length+1,
        name,
        dept,
        classs
    }
}
catch(error){
    console.log(`Message : ${error}`)
}
})
app.get("/userByid/:id",(req,res)=>{
    
    try {
        const id=(req.params.id)
        const use=arr.find((u)=> {
            return u.id==id;
        })
        if(!use){
            res.status(404).json({
                message:"user not found"
            })
        }
        else{
            res.status(200).json({
                message:"user found",
                use
            })
        }
        
    } catch (error) {
        console.group(`message : ${error}`)
    }
})
app.listen(port,()=>{
    console.log(`running on server ${port}`)
})