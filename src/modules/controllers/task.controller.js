 const Task = require('../../db/models/task/index');

 module.exports.getAllTasks = (req, res, next) => { 
    Task.find().then(result => { 
        res.send({data:result}); 
    });
};

module.exports.createNewTask = (req, res, next) => { // сохрняем задачу в БД
    const task = new Task(req.body); // создаём локальную переменную Task и передаём туда req.body, которое хранить тело нашей задачи
    task.save().then(result => {
        res.send(result);
    }).catch(err => console.log(err));
};

module.exports.changeTaskInfo = (req, res, next) => { //обновление данных  
    Task.updateOne({_id: req.body._id}, req.body).then(result => {
        Task.find({_id: req.body._id}).then(result => {
            res.send({data: result});
        });
    });
};

module.exports.deleteTask = (req, res, next) => { //как get запрос: присылаем body и id элементов
    Task.deleteOne({_id: req.body._id}).then(result => {
        Task.find().then (result => {
            res.send({data: result});  
        });
    });
};

