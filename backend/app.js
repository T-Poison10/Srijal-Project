const express = require("express");
const {} = require("@prisma/client");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors")

const app = express();
app.use(express.json())
app.use(cors());
const prisma = new PrismaClient()


app.get("/task",async (req,res)=>{
    const tasks = await prisma.todo.findMany();
    res.send(tasks);
})

app.post("/task",async(req, res)=>{
    const inputTask = req.body
    const task = await prisma.todo.create({
        data: inputTask
    })
    res.send({message: "task added", task})
})

app.delete("/task", async(req,res)=>{
    const id = req.body.id
    const deletedTask = await prisma.todo.delete({
        where:{
            id : id
        }
    })
    res.send({Message:"Task Deleted",
        deletedTask
    })
})


app.put("/task",async (req,res)=>{
    const id = req.body.id
    const updatedTask = await prisma.todo.update({
        where:{id:id},
        data:{isCompleter:true}
    })

    res.send(updatedTask)
})

app.listen(5000,()=>{
    console.log("Server is running")
})