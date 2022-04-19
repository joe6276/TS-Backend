import  express, { Request,Response,NextFunction}  from "express";
import routes from './routes/todo'
import { json } from "body-parser";


const app= express()
app.use(json())
app.use('/todo', routes)
// middleware

app.use((err:Error, req:Request, res:Response, next: NextFunction)=>{
res.status(500).json({message:err.message})
})
app.listen(4007, ()=>{
    console.log('Running...');
    
})

