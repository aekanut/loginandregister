const express = require("express");
const path = require("path");
const mongoose = require("mongoose")
const User = require("./public/model/user")
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'asdfdsafdfdafd355dsg48/14/==-fds555asdfd53134*/*sfafasdf';

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

app.post('/api/register', async (req, res) => {
    const { username, password: plainTextPassword, firstname, lastname, birthday } = req.body

    if (!/^[a-zA-Z]/.test(username)) return res.json({ status: 'error', error: 'Username should have english characters at first' })

    if (!/^[a-zA-Z]/.test(plainTextPassword)) return res.json({ status: 'error', error: 'Password should have english characters at first' })

    if (username.length < 6) return res.json({ status: 'error', error: 'Username should be atleast 6 characters' })

    if (plainTextPassword.length < 6) return res.json({ status: 'error', error: 'Password should be atleast 6 characters' })

    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await User.create({
            username,
            password,
            firstname,
            lastname,
            birthday
        })
        console.log('User create successfully : ', response);
    } catch (error) {
        //JSON.stringify to check type of error
        if (error.code === 11000) {
            //duplicate key
            return res.json({ status: 'error', error: 'Username already in use' });
        }
        throw error
    }

    return res.json({ status: "ok" })
})

app.post('/api/login', async (req, res) => {

    const { username, password } = req.body;

    //lean() for get just json
    const user = await User.findOne({ username }).lean()

    if (!user) {
        return res.json({ status: "error", error: "Invalid username/password" })
    }

    if (await bcrypt.compare(password, user.password)) {
        //compare username and password

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            }, 
            JWT_SECRET
        )

        return res.json({ status: 'ok', data: token })
    } 
    return res.json({ status: "error", error: "Invalid username/password" })
})

app.listen(3000, () => {
    console.log("Server is running in port 3000...")
});