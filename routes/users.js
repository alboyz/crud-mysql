const express = require ('express')
const app = express()

//SHOW LIST OF USERS
app.get('/', function (req, res, next){
	req.getConnection(function(error, conn){
		conn.query('SELECT * FROM users ORDER BY id DESC', function(err, rows, fields){
			//if(err) throw err
			if(err){
				req.flash('error', err)
				res.render('user/list', {
					title: 'User List',
					data:''
				})
			} else {
				//render to views/user/list.ejs template file
				res.render('user/list', {
					title: 'User List',
					data: rows
				})
			}
		})
	})
})



