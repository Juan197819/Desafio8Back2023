import express from 'express'
import config from './src/config/config.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";
import { Server } from "socket.io";
import { errorHandler } from './src/middleware/errorHandler.js';
import passport from 'passport';
import './src/passport/passportLocal.js'
import './src/passport/passportGithub.js'
import router from './src/routes/index.js'
if(config.PERSISTENCIA=='MongoDB') import('./src/daos/MongoDB/db/connectionMongo.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname +'/src/public'))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname +'/src/views')
app.set('view engine', 'handlebars')

let mongoUrl =config.MONGO_ATLAS
if (config.NODE_ENV=='development') mongoUrl ='mongodb://localhost:27017/ecommerceLocal'

app.use(session({
    secret:'1234',
    saveUninitialized:true,
    resave:false,
    store: new MongoStore({
        mongoUrl,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl:10
    }),
    rolling:true,
    cookie:{
       maxAge: 100000
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/',router)
app.all('*', (req, res, next)=>res.status(404).json('Invalid path'))
app.use(errorHandler)

const PORT  = 8080
const server = app.listen(PORT,()=>{
    console.log('Escuchando en puerto ' + server.address().port)
}).on('error',err=>console.log('Fallo el servidor',err))

export const io = new Server(server)

