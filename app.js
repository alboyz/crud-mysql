const express = require('express');
const mysql = require('mysql');
const myconnection = require ('express-myconnection')
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('./config');
const index = require('./routes/index');
const users = require('./routes/users');

//middleware
const app = express()
let dbOptions = {
  host:   config.database.host,
  name:   config.database.name,
  password: config.database.password,
  port:   config.database.port,
  database: config.database.db
}

//connection is never closed
//make new connection per new request

app.use(myconnection(mysql, dbOptions, 'pool'))

app.set('view engine', 'ejs')
app.use(expressValidator())
app.use(bodyParser.unlercoded({extended:true}))
app.use(bodyParser.json())

app.use(methodOverride(function(req, res){
 if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let  method = req.body._method
    delete req.body._method
    return method
  }
}))

//use cookie parser and session
app.use(cookieParser('keyboard cat'))
app.use(session({
			secret: 'keyboard-cat',
			resave: false,
			saveUnintialized: true,
			cookie: {maxAge: 6000}
}))
app.use(flash())

app.use('/', index)
app.use('users' ,users)

app.listen(3000, function(){
		console.log('server running at port 3000: htttp://127.0.0.1:3000')
})
