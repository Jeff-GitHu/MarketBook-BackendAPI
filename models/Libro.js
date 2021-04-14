const mongoose = require('mongoose')

const LibroSchema = new mongoose.Schema({
    titulo: {
        required: [true, 'Ingrese un tipo de libro'],
        maxLength: [100, 'El titulo de libro no puede ser mayor de 500 caracteres'],
        type: String
    },
    description: String,
    price: Number,
    publicDate: Date,
    author: {
        id:String,
        completeName: String
    }
})

module.exports = mongoose.model("Libro", LibroSchema)