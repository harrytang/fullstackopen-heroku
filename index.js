/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// importing
const Person = require('./models/person');

// config
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}));
app.use(express.static('build'));

// list all
app.get('/api/persons', (req, res) => {
    Person.find().then(persons => {
        res.json(persons)
    });
});

// get individual person
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person);
            } else {
                res.status(404).end();
            }
        })
        .catch(error => next(error))
});

// delete a person
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error));
});

// create person
app.post('/api/persons', (req, res, next) => {
    const body = req.body;

    if (!body.name && !body.number) {
        return res.status(400).json({
            error: 'name and/or number is missing'
        })
    }

    // name unique
    Person.findOne({'name': body.name})
        .then(person => {
            if (person) {
                return res.status(400).json({
                    error: 'name must be unique'
                })
            } else {
                const person = {
                    name: body.name,
                    number: body.number,
                };

                Person.create(person)
                    .then(person => {
                        res.json(person)
                    })
                    .catch(error => next(error));
            }
        })
        .catch(error => next(error));
});

// update person
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number,
    };

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
        .then(updatedNote => {
            res.json(updatedNote.toJSON())
        })
        .catch(error => next(error))
});

// info
app.get('/info', (req, res) => {
    Person.count('name')
        .then(total => {
            res.send(`phonbook has ${total} people.<br/> ${new Date()}`)
        });

});

/* handler of requests with unknown endpoint */
const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
};
app.use(unknownEndpoint);

/* error handler */
const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({error: 'ID format invalid'})
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
    next(error)
};
app.use(errorHandler);

// start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});