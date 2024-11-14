const express = require('express');
const show = express.Router();
const {User,Show} = require('../models/index.js'); 
const { check, validationResult } = require('express-validator');


// Middleware
show.use(express.json());
show.use(express.urlencoded());

// Get Methods
show.get('/', async (req, res) =>{
    if(Object.keys(req.query).length === 0){
        const result = await Show.findAll();
        res.send(result);
    }
    else if(req.query.genre){
        const result = await Show.findAll({where:{genre: req.query.genre}});
        res.send(result);
    }
});

show.get('/:id', async (req, res) =>{
    const result = await Show.findByPk(req.params.id);
    res.send(result);
});

// Get all users who watched a show based on show id
show.get('/getusers/:id', async(req, res)=>{
    const result = await Show.findByPk(req.params.id, { include: [User]})
    res.send(result.users).json();
});

// POST methods
show.post('/',
    [
        check('title').isLength({max:25, min: 1}).withMessage('Name must be at least 1 character long and max 25 characters long.'),
        check('genre').not().isEmpty().trim(),
        check('rating').not().isEmpty().trim(),
        check('available').not().isEmpty().trim()
    ],
    async(req, res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.array()});
        }
        else{
            const result = await Show.create(req.body);
            res.send(result).json();
        }
    }
);

// PUT methods
show.put('/:id', async (req, res)=>{
    const result = await Show.update(req.body,{
        where: {
            id: req.params.id
        }
    });
    res.send(result).json();
});

// DELETE methods
show.delete('/:id', async (req, res)=>{
    const result = await Show.findByPk(req.params.id);
    result.destroy();
    res.send(result).json();
});

module.exports = show;