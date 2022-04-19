import   { RequestHandler}  from "express";
import { Todo } from "../models/todo";
// DRY CODING
// export const createTodo=( req:Request,res:Response,next:NextFunction)=>{

// }
const Todos:Todo[]=[]

export const createTodo:RequestHandler=( req,res,next)=>{
const text=(req.body as{text:string}).text


const newTodo=new Todo(Math.random().toString(), text)

Todos.push(newTodo)

res.status(201).json(
    {message:'Created todo',
    todo:newTodo
    }
)

}
export const getTodo:RequestHandler=(req,res,next)=>{
    res.json({todos:Todos})
   

}

export const getSpecificTodo:RequestHandler<{id:string}>=(req,res,next)=>{

    const todoid=req.params.id
    const todoIndex=Todos.findIndex(x => x.id === todoid);

    if(todoIndex<0){
        throw new Error('Could not Find Todo')
    }

    res.json(Todos[todoIndex])

}

export const updateTodo:RequestHandler<{id:string}>=(req,res,next)=>{
    const todoid =req.params.id
    const {text}= req.body as {text:string}

    const todoIndex=Todos.findIndex(x => x.id === todoid);

    if(todoIndex<0){
        throw new Error('Could not Find Todo')
    }

    Todos[todoIndex]= new Todo(Todos[todoIndex].id,text)

    res.status(201).json({

        message:" Todo Updated Successfully ",
        todos:Todos[todoIndex]
    })

}

export const deleteTodo:RequestHandler<{id:string}>=(req,res,next)=>{
const todid =req.params.id
const todoIndex=Todos.findIndex(x => x.id === todid);
if(todoIndex<0){
    throw new Error('Could not Find Todo')
}

Todos.splice(todoIndex,1)
res.status(201).json({message:'Todo Deleted Successfully'})
}