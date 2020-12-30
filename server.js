const express = require("express");
const path = require("path");
const mongoose = require("mongoose")
const user = require("./public/model/user")
const bcrypt = require('bcryptjs')

const app = express();

//for json
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/newdatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

//for css
app.use('/public/stylesheets', express.static(path.join(__dirname, "public", "stylesheets")));
//for script
app.use('/public/script', express.static(path.join(__dirname, "public", "script")));
//for index
app.use('/', express.static(path.join(__dirname, "public", "static")));


app.post('/api/register',async (req, res) => {
    const { username, password: plainTextPassword, firstname, lastname, birthday } = req.body

    if(!/^[a-zA-Z][a-zA-Z]+/.test(username)) return res.json({status: 'error', error: 'Username should have english characters at first'})

    if(!/^[a-zA-Z][a-zA-Z]+/.test(plainTextPassword)) return res.json({status: 'error', error: 'Password should have english characters at first'})

    if(username.length < 6) return res.json({status: 'error', error: 'Username should be atleast 6 characters'})

    if(plainTextPassword.length < 6) return res.json({status: 'error', error: 'Password should be atleast 6 characters'})

    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await user.create({
            username,
            password,
            firstname,
            lastname,
            birthday
        })
        console.log('User create successfully : ',response);
    } catch(error) {
        //JSON.stringify to check type of error
        if(error.code === 11000) {
            //duplicate key
            console.log({status: 'error', error: 'Username already in use'})
            return res.json({status: 'error', error: 'Username already in use'});
        }
        throw error
    }

    res.json({ status: "ok" })
})

app.post('/api/login', (req, res) => {
   
    console.log(check)
    res.json({ status: "ok" })
})

app.listen(3000, () => {
    console.log("Server is running in port 3000...")
});