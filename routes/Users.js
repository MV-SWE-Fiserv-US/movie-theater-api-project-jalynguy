const express = require('express');
const user = express.Router();
const {User, Show} = require('../models/index.js');
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

// GET method for all shows watched by a user
user.get('/findShows/:id', async (req, res)=>{
    const id = req.params.id;
    let result = await User.findByPk(id, { include: [Show] });
    res.send(result.shows).json();
})
// Middleware
user.use(express.json());
user.use(express.urlencoded());

// Post Methods
user.post('/', 
    [
        check('username').isEmail().withMessage('Username must be a valid email'),
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