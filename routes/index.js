const express = require ('express')
const app = express ()

 app.get('/', function(req, res){
 	res.render('index', {title: 'My Node.js Application'})
 })


module.exports = app;
