require('dotenv').config()
const express = require('express')
const app = express()
const taskRouter = require('./routes/task.js')
const notFound = require('./middleware/not-found.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')
//middleware
app.use(express.static('./public'))
app.use(express.json())
//route
app.use('/api/v1/tasks',taskRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)
const port = 3000
const connectDB = require('./db/connect.js')
const start = async () => {
	try{
		await connectDB(process.env.MONGO_URL)
		app.listen(port,() => {console.log(`Server is listening on ${port}`)})
	}
	catch(err){
		console.log(err)
	}
}
start()