const express = require('express');
const app = express();
const axios = require('axios');
const Film = require('./Film');
//const path = require('path'); //---heroku---
const cors = require('cors');

const port = process.env.PORT || 2000;

app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//localhost:2000/getfilm?title=FilmTitle
app.get('/getfilm', (req, res) => {
  const title = req.query.title;
  const querystr = `https://swapi.co/api/films/?search=${title}`;

  axios
    .get(querystr)
    .then(response => {
      const film = new Film({
        title: response.data.results[0].title,
        episode_id: response.data.results[0].episode_id,
        opening_crawl: response.data.results[0].opening_crawl,
        director: response.data.results[0].director,
        producer: response.data.results[0].producer,
        release_date: response.data.results[0].release_date
        // image:
      });
      if (!film.title) {
        res.status(200).json('Not found');
        return;
      }
      film
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });

      // console.log(response.data.results[]);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:2000/getallfilms
app.get('/getallfilms', (req, res) => {
  Film.find({})
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

//localhost:2000/deletefilm?title=FilmTitle
app.get('/deletefilm', (req, res) => {
  Film.deleteMany({ title: req.query.title })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
