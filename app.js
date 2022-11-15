const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://dunyanong:WTL6183@nodetuts.jzktfj6.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((request) => {
        // listen to request
        app.listen(3000);
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log(err);
    });


// To create view engine:
app.set('view engine', 'ejs');

// static file of style.css with the foldername of public
app.use(express.static('public'));

// middle ware for 
app.use(express.urlencoded({ extended: true }));

// middle ware for logging details
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }));

// Creating an express server
app.get('/', (req, res) => {
    res.redirect('/blogs')
    
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: 'Page not found'});
});

















