const express = require("express");
const path = require("path");
const mongoose = require("mongoose")
const user = require("./public/model/user")

const app = express();

//for json
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/newdatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use('/', express.static(path.join(__dirname, "public", "static")));


app.post('/api/register', (req, res) => {
    console.log(req.body)
    res.json({ status: "ok"})
})

app.listen(3000, () => {
    console.log("Server is running in port 3000...")
});