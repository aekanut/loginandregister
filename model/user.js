const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthday: { type: String, required: true }
}, { collation: 'users'}
)

const model = mongoose.model('person', PersonSchema);

module.exports = model;