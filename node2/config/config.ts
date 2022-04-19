import mssql  from 'mssql'
import dotenv  from 'dotenv'
dotenv.config()

// connect to db
let configurations = {
    server: process.env.Server as string,
    user:  process.env.User as string,
    database: process.env.Database as string,
    password: process.env.Password as string
   ,
  
    options: {
   
       encrypt: false as boolean,
      
    },
    pool: {
        max: 10 as number,
        min: 0 as number,
        idleTimeoutMillis: 30000 as number
    }
    }

mssql.connect(configurations).then(pool =>{

    if(pool.connecting){
        console.log('connecting to the database')
    }

    if(pool.connected){
        console.log("connected")
    }
}).catch(e=>console.log(e))


export default configurations