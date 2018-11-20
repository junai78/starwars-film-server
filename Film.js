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

const schema = mongoose.Schema({
  title: { type: String },
  year: { type: String },
  genre: { type: String },
  actors: { type: String },
  plot: { type: String },
  poster: { type: String }
});

//title, episode_id, opening_crawl, director, producer, release_date
//no image - how to implement

const Film = mongoose.model('Film', schema, 'filmCollection');

module.exports = Film;
