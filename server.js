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
    console.log(req.body)
    
    const { username, password: plainTextPassword, firstname, lastname, birthday } = req.body

    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await user.create({
            username,
            password,
            firstname,
            lastname,
            birthday
        })
        console.log('User create successfully',response);
    } catch(error) {
        console.log(error)
        return res.json({status: 'error'})
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