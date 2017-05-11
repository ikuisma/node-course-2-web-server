const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var logstamp = `${now}: ${req.method} ${req.url}`;
  console.log(logstamp);
  fs.appendFile('server.log', logstamp + '\n', (err) => {
    if (err) {
        console.log('Unable to append to server.log.')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: "Hola, amigo!"
  })
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About page'
  });
});

// /bad send json with an errorMessage property.
app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Life is hard sometimes, I am so sorry.'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
});
