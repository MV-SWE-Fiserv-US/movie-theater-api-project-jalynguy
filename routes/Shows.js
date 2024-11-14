const express = require('express');
const show = express.Router();
const Show = require('../models/Show.js');
const { db } = require('../db/connection.js');
const { check, validationResult } = require('express-validator');

// Get Methods
show.get('/', async (req, res) =>{
    const result = await Show.findAll();
    res.send(result);
});

show.get('/:id', async (req, res) =>{
    const result = await Show.findByPk(req.params.id);
    res.send(result).json();
});

show.get('/genre', async (req, res) =>{
    const result = await Show.findAll({where:{genre: req.query.genre}});
    res.send(result).json();
});
// Middleware
show.use(express.json());
show.use(express.urlencoded());

// POST methods
show.post('/',
    [
        check('title').not().isEmpty().trim(),
        check('genre'),not().isEmpty().trim(),
        check('rating').not().isEmpty().trim(),
        check('available').not().isEmpty.trim()
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
})

module.exports = show;