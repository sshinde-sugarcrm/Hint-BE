let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let connection = mysql.createConnection({
    host     : "",
    user     : "",
    password : "",
    database:  "",
    port     : ,
    timeout: 1223
});


connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed 1: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

var dummy="dummy";


router.post('/token', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    console.log("reached login");
    let array = [];
    array.push([email,password]);

    connection.query('SELECT * FROM user WHERE email = ?', [email], function (err, results) {
        if (err) throw err;
        console.log('--> ', results);

        if (results === null || results.length === 0) {
            console.log("bad request");
            return res.json({status: 401});
        }
        else if (results[0]) {
            console.log("results", results);
            let pass = results[0].password;
            let email=results[0].email;
            if (pass === password) {
                console.log("success", results[0]);
                return res.json({message: "Logged in Successfully", email: email, status: 200, tutor:false});
            }
            else {
                return res.json({status: 401});
            }
        }
    });
});

router.post('/logout', function(req,res){
    var session=req.session;
    dummy="dummy";
    console.log("In logout ", req.session.user)
    session.user = null;
    session.destroy();
    res.json({
        status:'200',
        message : "Logged Out."
    });
});

module.exports = router;
