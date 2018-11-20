const mongoose = require('mongoose');
const db =
  'mongodb://starwars-film-assignment:abc123@ds113134.mlab.com:13134/starwars-film-assignment';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

//no image - how to implement
const schema = mongoose.Schema({
  title: { type: String },
  episode_id: { type: String },
  opening_crawl: { type: String },
  director: { type: String },
  producer: { type: String },
  release_date: { type: String }
  // image: { type: String }
});

const Film = mongoose.model('Film', schema, 'filmCollection');

module.exports = Film;
