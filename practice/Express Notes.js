/*
Express.js notes

------------------------------------------------------------------------------------------------------------------------------------------
Node.js Crash Course Tutorial #6 - Express Apps
------------------------------------------------------------------------------------------------------------------------------------------
{Part One: What is express}
---> A framwork for managing routings, request, server side logic and responses.

To install express:
npm install express

{Part Two: Creating an express app}
---> By convention, we create a file called 'app.js'. Note that this is not react app

To import express, we use require like the other packages:
const express = require('express');

app is larger than server

// express app
const app = express();

// listen to request
app.listen(3000);


How to get request url/ create an express server?
--> This is also the equivalent case in switch statements
--> req and res object

app.get('yourPathName', (req, res) => {
    res.send('your message')
});

app.get('/', (req, res) => {
    res.send('<p> Home page </p>') <--- The system will detect this form as html page, so no setHeaders is needed 
});

Instead of using res.write() plus res.end() plus res.setHeader(),
we can use res.send() in express!

{Part Three: Routing and HTML page}
---> we use res.sendFile('filepath', {root: __dirname})
__dirname gets us the absolute path of the current directory


app.get('/', (req, res) => {
    res.sendFile('./views/index.html', {root: __dirname});
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', {root: __dirname});
});

{Part Four: Redirect}
use res.redirect(path/link);
--> It automatically sets the status code without doding manual work

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

{Part Five: 404 page}
use app.use(callbackFunction)
--> It is used to create middleware and fire middleware function
--> Remember to put the app.use() under the routing codes,
because express will run from top to bottom.

app.use((req, res) => {
    res.sendFile('./views/404.html', {root: __dirname})
})

Special case: Unfortunately, you must define the 
port number manually unlike the other ports or path

we use res.status(404), this still return the response object]

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname})
})

------------------------------------------------------------------------------------------------------------------------------------------
Node.js Crash Course Tutorial #7 - View Engines
------------------------------------------------------------------------------------------------------------------------------------------

{Part One: EJS View Engine}
View engines are used for dynamics value unlike static websites like plain HTML
Using view engines, we can do server side rendering, whcih porvides better SEO compared to client rendering.

install EJS:
npm install ejs

To resgister(create) view engine:
app.set('view engine', 'ejs');

---> This also configure soem application settings, one of them is the view engine
---> Express will go to the views folder to find the html codes, by default.So always
put views as your html pages for yoru directory name

What is an EJS file:
---> It is basically a file used to run html codes.
---> It uses the .ejs extension instead.

// Creating an express server
app.get('/', (req, res) => {
    res.render('index');  <---- Remember, do not inclue the extension
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.use((req, res) => {
    res.status(404).render('404');
})

{Part Two: Passing data into views}
Basic-Level:
<% %> - the ejs tag without outputting front-end.
<%= %> - the ejs tag for outputting front-end.

Inside this tag, we can put javascript codes inside it.

A simple example:
<% const name = 'mario'; %>
<p><%= name %></p>

Amateur-Level: changing the title of page when we change the packages

In app.js
app.get('/', (req, res) => {
    res.render('index', { title: 'home' }); <--- This object will be stored in the index.ejs file.
    
});

In index.ejs
<title>Netninja course | <%= title %></title>


Intermediate Level: Add blogs and details
In index.ejs
        <% if(blogs.length > 0) {%>
            <% blogs.forEach(blogs => { %>
                <h3 class="title"><%= blogs.title%></h3>
                <p class="snippet"><%= blogs.snippet%></p>
            <% }) %>
        <% } else{%>
            <p>Oops, there are currently no blogs available here :(</p>
        <% }%>

In app.js
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    
    res.render('index', { title: 'Home', blogs: blogs  });
    
});

{Part Three: Partials}
To import repeated codes into a file

partials are codes that can be reused by storing the codes in another file.

<% -include('filePath') %> <--- this links the partial to the file

"-" for functions or method from express
"=" for strings

------------------------------------------------------------------------------------------------------------------------------------------
Node.js Crash Course Tutorial #8 - Middleware
------------------------------------------------------------------------------------------------------------------------------------------
{Part One: Middleware}
--> Middleware are codes that run on the server between sending a request and detecting a reponse.
--> We use app.use() and app.get( ) to write middleware.
--> Order in middleware matters.

Examples of middleware:
1) Authentication
2) Parse JSON Data
3) Returns 404 page.

Creating a middleware that log details out to the console for every request.

app.use((req, res) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
})


This snippets causes a never ending loading why?
Bevause express does not automatically know when to move on.

{Part Two: using next}
app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);

    next();
})

next() will find the next get or use method!

{Part Three: Third Party Middleware}
In this course, we will be looking at Morgan - a console logger.
To know more, look up the npm morgan documentation

npm install morgan
const morgan = require('morgan');

app.use(morgan('yourMorganAbility'));

{Part Three: Static file}
How to allow express to show the users the public files?

app.use(express.static('foldername'));

app.use(express.static('public')) <---- express looks to the public folder/directory



























































*/