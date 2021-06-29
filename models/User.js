const mongoose = requiere("mongoose");

const UsersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Por favor ingrese un nombre"],
  },
  lastName: {
    type: String,
    required: [true, "Por favor ingrese el apellido"],
  },
  userName: {
    type: String,
    required: [true, "Por favor ingrese un username"],
  },
  email: {
    type: String,
    required: [true, "Por favor ingrese un email"],
    unique: true,
    match: [
      /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
      "Ingrese un email valido",
    ],
  },
  password: {
    type: String,
    required: [true, "Por favor ingrese un password"],
    minlength: 6,
    select: false,
  },
});

module.exports = mongoose.model("User", UsersSchema);
