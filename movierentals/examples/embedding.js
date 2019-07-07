const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground-denormalized')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const genreSchema = new mongoose.Schema({
  name: {
    type: [String],
    required: true
  }
});

const Author = mongoose.model('Author', authorSchema);
const Genre = mongoose.model('Genre', genreSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: {
    type: [authorSchema],
    required: true
  },
  genre: {
    type: genreSchema,
    required: true
  }
}));

async function createCourse(name, authors, genre) {
  const course = new Course({
    name,
    authors,
    genre
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId) {
  /*const course = await Course.findById(courseId);
  course.author.name = "Bhuvaneswaran";
  course.save();*/
  const course = await Course.update({ _id: courseId }, {
    $set: {
      'author.name': 'Bhuvanes'
    }
  });
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

//createCourse('Node Course', [new Author({ name: 'Bhuvan' }), new Author({ name: 'Adhav' })], new Genre({ name: ['Action', 'Thriller'] }));
//addAuthor("5d196c816cf2f658bc175bf9", new Author({ name: 'Sana' }));
removeAuthor("5d196c816cf2f658bc175bf9", "5d196f7098a8c25760189b5c");
//updateCourse("5d1964ce6ee66259d8efbe24");
