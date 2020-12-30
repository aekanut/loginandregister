const express = require("express");
const path = require("path");
const mongoose = require("mongoose")
const User = require("./model/user")

mongoose.connect('mongodb://localhost:27017/newdatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const app = express();

app.use('/', express.static(path.join(__dirname, "static")));

app.use(express.json());
app.post('/api/register', (req, res) => {
    console.log(req.body);
    res.json({ status: "ok"})
})

app.listen(3000, () => {
    console.log("Server is running in port 3000...")
});