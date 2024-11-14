const express = require('express');
const user = express.Router();
const User = require('../models/User.js');
const { db } = require('../db/connection.js');
const { check, validationResult } = require('express-validator');

// Get Methods
user.get('/', async (req, res) =>{
    const result = await User.findAll();
    res.send(result);
})

user.get('/:id', async (req, res)=>{
    const result = await User.findByPk(req.params.id);
    res.send(result);
});

//TODO : GET method for all shows watched by a user

// Middleware
user.use(express.json());
user.use(express.urlencoded());

// Post Methods
user.post('/', 
    [
        check('username').not().isEmpty().trim(),
        check('password').not().isEmpty().trim()
    ]
    , async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.array()});
        }
        else{
            const result = await User.create(req.body);
            res.send(result).json();
        }
    }
);

// Put Method
user.put('/:id', async (req, res) =>{
    const result = await User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    res.send(result).json();
});

// Delete Method

user.delete('/:id', async (req, res) => {
    const result = await User.findByPk(req.params.id);
    await result.destroy();
    res.send(result).json();
});

module.exports = user;