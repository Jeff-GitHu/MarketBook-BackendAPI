const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    academicGrade: String,
    names: String
})

module.exports = mongoose.model('Author', AuthorSchema)