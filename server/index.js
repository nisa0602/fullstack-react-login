require ('dotenv').config()

const mongoose = require ('mongoose');
const express = require ('express');
const app = express();
const cors = require ('cors');
const bodyParser = require ('body-parser');
const router = require ('./routes/user-routes');

//database connection
const url = 'mongodb+srv://nisa:nisaknh@cluster0-2icdr.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const database = mongoose.connection
database.on('error', (error) => console.error(error))
database.once('open', () => console.log('connected to database'))

app.use(express.json())
app.use(cors())

const userRouter = require ('./routes/user-routes')
app.use('/users', userRouter)

app.listen(3004, () => console.log('server started'))