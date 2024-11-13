const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "ezlaw"
});

function hashpassword(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}
  
function comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

app.post('/signup', (req,res) =>{
    const { firstname, lastname, email, password } = req.body;
    db.query(
        'select * from user where email = ?',
        [email],
        (err,Result) => {
            if(err){
                console.error(err);
                return res.status(500).json({message: 'databse error'});
            }
            if(Result.length > 0){
                return res.status(400).json({message: 'Email already registered'});
            }

            const hashedpassword = hashpassword(password);

            db.query(
                'insert into user (user_firstname, user_lastname, user_email,user_password) values(?,?,?,?)',
                [firstname,lastname,email,hashedpassword],
                (err,Result) => {
                    if(err){
                        console.error(err);
                        return res.status(500).json({message:'darabase error'});
                    }
                    res.status(201).json({message: 'user create success'});
                }
            );
        }
    );
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    db.query(
        'select * from user where email = ?',
        [email],
        (err, result) => { 
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'database error' });
            }
            if (result.length === 0) {
                return res.status(401).json({ message: 'invalid email or password' });
            }
            const user = result[0];
            if (!comparePassword(password, user.user_password)) {
                return res.status(401).json({ message: 'invalid email or password' });
            }
            res.status(200).json({ message: 'Sign in successful' });
        }
    );
});

app.listen(3000, () =>{
    console.log('server running');
})