
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bhuvan')
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.error('Could not connect to MongoDB ', err))

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 255, uppercase: true },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished },
        get: v => { return Math.round(v) },
        set: v => { return Math.round(v) }
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Spring Boot',
        author: 'Bhuvan',
        tags: {
            type: Array,
            validate: {
                validator: function (v) { return v && v.length > 0 },
                message: "A course should have atleast one tag"
            },
            isPublished: true,
            price: 25.7,
            category: 'web'
        });
    const result = await course.save();
    console.log(result);
}

async function getPublishedCourses() {
    const result = await Course.find({ isPublished: true })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 })
        .skip(10) //pagination
        .limit(10) //pagination
    console.log(result);
}
async function getCourse(criteria) {
    const result = await Course.find(criteria)
        .select('name author')
        .sort('-name')
    console.log(result);
}
async function getPublishedTaggedCourses() {
    const result = await Course.find({ isPublished: true, tags: { $in: ['frontend'] } })
        .sort({ price: -1 })
        .select('name')
    console.log(result);
}

async function getCourseswithPatterns() {
    const result = await Course.find()
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    console.log(result);
}

async function updateCourse(id) {
    //method:1 retrieve the course first, check for existence and then update
    /*const course = await Course.findById(id);
    if (!course) {
        console.log('Course not found');
        return;
    }
    course.isPublished = true;
    course.author = 'Adhav';
    const result = await course.save();*/
    //method 2: Directly update using the id
    /*const result = await Course.updateOne({ _id: id }, {
        $set: {
            author: 'Another Author'
        }
    });*/
    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Adhav'
        }
    }, { new: true }); //new property will send return the data after update is executed
    console.log('Update query ', result);
}

async function deleteCourse(id) {

    const result = await Course.findByIdAndDelete(id);
    console.log('Delete query ', result);
}

createCourse();
//getPublishedCourses();
//getPublishedTaggedCourses();
//getCourseswithPatterns();
//updateCourse("5d17c020ca29371728d847ce");
//deleteCourse("5d18ccb2ef8a0322307fb6ab");

