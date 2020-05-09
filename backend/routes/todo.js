const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const todoRoutes = express.Router();


let Todo = require('../models/todo.model');


todoRoutes.route('/').get(function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.get('/:id/', function (req, res) {
    let id = req.params.id;
    Todo.findById(id, function (err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/add').post(function (req, res) {
    let todo = new Todo(req.body);
    todo.save().then(todo => {
        res.status(200).json({'todo': 'todo added successfully'});
    })
        .catch(err => {
            res.status(400).json({'todo': 'todo added failed'});
        })
});

todoRoutes.route('/update/:id').post(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo)
            res.status(400).send('data not found');
        else
            todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;

        todo.save().then(todo => {
            res .json('todo updated successfully');
        })
            .catch(err => {
                res.status(400).json('todo updated failed');
            });
    });
});

todoRoutes.route('/delete/:id').delete(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo)
            res.status(400).send('data not found');
        else
        todo.delete().then(todo => {
            res .json('todo deleted successfully');
        })
            .catch(err => {
                res.status(400).json('todo updated failed');
            });
    });
});

module.exports = todoRoutes;
