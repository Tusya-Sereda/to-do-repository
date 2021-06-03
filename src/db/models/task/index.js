const mongoose = require("mongoose");

const { Schema } = mongoose;

//создаём свою схему, как на клиентской стороне 
const taskScheme = new Schema ({
    text: String,
    isCheck: Boolean
})

module.exports = Task = mongoose.model('tasks', taskScheme);