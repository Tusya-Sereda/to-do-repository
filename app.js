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
    isCheck: Boolean,
    id: Number
})

const uri = "mongodb+srv://Natalia_25:nata2502@db-for-to-do.rwdqq.mongodb.net/DB-For-To-DO?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

const Task = mongoose.model("tasks", taskScheme);

app.use(cors());
app.use(express.json());

app.get('/allTasks', (req, res) => { //получаем allTasks
    Task.find().then(result => { //find указываем пустым, так как нужно получить все
        res.send({data:result}); //когда получим наши таски отправляем их пользователю 
    });
});

app.post('/createTask', (req, res) => { // сохрняем задачу в БД
    const task = new Task(req.body); // создаём локальную переменную Task и передаём туда req.body, которое хранить тело нашей задачи
    task.save().then(result => {
        res.send(result);
    }).catch(err => console.log(err));
});

app.patch('/updateTask', (req, res) => { //обновление данных  
    Task.updateOne({_id: req.body._id}, req.body).then(result => {
        console.log(req.body)
        Task.find({_id: req.body._id}).then(result => {
            res.send({data: result});
        })
    })
    res.send('Success patch /');
})

app.delete('/deleteTask', (req, res) => { //как get запрос: присылаем body и id элементов
    Task.deleteOne({_id: req.body._id}).then(result => {
        Task.find().then (result => {
        res.send({data: result});  
        })
    })
})

app.listen(8000, () => {
    console.log('Example app listening on port 8000');
});