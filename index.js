const startupDebugger = require("debug")('app:startup')
const dbDebugger = require("debug")('app:db')
const config = require('config');
const morgan=require("morgan")
const helmet=require("helmet")
const Joi = require("joi")
const genres = require("./routes/genres")
const home= require("./routes/home")

const logger = require("./middleware/logger")
const express = require("express")
const app = express();

app.set("view engine", 'pug')
app.set("views", './views')

app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(helmet())
app.use("/api/genres",genres)
app.use("/",home)


console.log('Application Name:'+ config.get('name'))
console.log('Application Name:'+ config.get('mail.host'))
// console.log('mail password:'+ config.get('mail.password'))

if (app.get('env')==='development'){
    app.use(morgan("tiny"))
    startupDebugger("Morgan enabled...")
}

dbDebugger('connected to the database')

const port = process.env.PORT || 3000
app.listen(port,() => console.log(`Listen on port ${port}...`)) 
