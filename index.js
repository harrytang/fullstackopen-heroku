/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan((tokens, req, res)=>{
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}));


let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons)
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id);
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(note => note.id !== id);
    res.status(204).end()
});

generateID = (length=6)=> {
    const min = Math.pow(10, length-1);
    const max = Math.pow(10, length)-1;
    return Math.floor(Math.random() * (max - min + 1) + min);
};


app.post('/api/persons', (req, res) => {
    const id = generateID(9);
    const body = req.body;

    if (!body.name && !body.number) {
        return res.status(400).json({
            error: 'name and/or number is missing'
        })
    }

    if(persons.find(person=>person.name.search(new RegExp(body.name, 'i'))>-1)){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: id
    };

    persons = persons.concat(person);
    res.json(person);
});

app.get('/info', (req, res) => {
    res.send(`phonbook has ${persons.length} people.<br/> ${new Date()}`)
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});