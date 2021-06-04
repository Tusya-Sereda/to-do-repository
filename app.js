const express = require('express');
const mongoose = require("mongoose"); //импорт библиотеки
const cors = require('cors');
const app = express();

const apiRoutes = require("./src/modules/routes/routes");

const uri = "mongodb+srv://Natalia_25:nata2502@db-for-to-do.rwdqq.mongodb.net/DB-For-To-DO?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

app.use(cors());
app.use(express.json());
app.use("/",apiRoutes);

app.listen(8000, () => {
    console.log('Example app listening on port 8000');
});