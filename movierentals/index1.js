const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views');

const courses = [
    { id: 1, name: "Angular" },
    { id: 2, name: "React" },
    { id: 3, name: "Node" }
]
app.get('/', (req, res) => {
    //res.send('Hello world');
    res.render('index', { title: 'My Express App', message: 'Hello' });
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));

    if (!course) return res.status(404).send("The course id is not available");


    res.send(course);
});

app.post('/api/courses', (req, res) => {

    const result = validateCourses(req.body);
    if (result.error)
        return res.status(400).send(result.error.detail[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(courses);
});

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(course => course.id === parseInt(req.params.id));

    if (!course) return res.status(404).send("The course id is not available");

    const result = validateCourses(req.body);
    if (result.error)
        return res.status(400).send(result.error.detail[0].message);

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(course => course.id === parseInt(req.params.id));

    if (!course) return res.status(404).send("The course id is not available");

    const index = courses.indexOf(course);

    courses.splice(index, 1);
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => { //query params = ?sortBy=name&subject=computer
    //res.send(req.params);
    //res.send(req.query);
    const course = courses.filter(course => course.id === parseInt(req.params.id));
    res.send(course);
});

const port = process.env.port || 2001;
app.listen(port, () => console.log(`Listening to Port ${port}`));

function validateCourses(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}
