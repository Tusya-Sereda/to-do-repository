const express = require('express');
const mongoose = require("mongoose"); //импорт библиотеки
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { Schema } = mongoose; // через таблицы мы работаем со схемами 
// Поэтому из mongoose вытаскиваем элемент Схемы

//создаём свою схему, как на клиентской стороне 
const taskScheme = new Schema ({
    text: String,
    isCheck: Boolean
})

const uri = "mongodb+srv://Natalia_25:nata2502@db-for-to-do.rwdqq.mongodb.net/DB-For-To-DO?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

const Task = mongoose.model("tasks", taskScheme);

app.use(cors());

// app.get('/allTasks', (req, res) => {
//     Task.find().then(result => {
//         res.send({data:result});
//     });
// });

// app.post('/createTask', (req, res) => {
//     const task = new Task(req.body);
//     task.save().then(result => {
//         res.send('Task');
//     });
// });

app.get('/', (req, res) => { //get, post, patch, delete
    const task = new Task({
        text: "Second task",
        isCheck: false
    });
    task.save().then(result => {
        res.send(result);
    }).catch(err => console.log(err));
});

app.get('/paramRequest', (req, res) => {
    Task.find().then(result => {
        res.send({data: result}); //возвращаем данные на сервер 
    })
});

app.post('/post/user/:id', (req, res) => {
    res.send('post /');
})

app.put('/', (req, res) => { //обновление данных 
    res.send('put /');
})

app.delete('/', (req, res) => {
    res.send('delete /');
})

app.listen(8000, () => {
    console.log('Example app listening on port 8000');
});