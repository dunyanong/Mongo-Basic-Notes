/*
------------------------------------------------------------------------------------------------------------------------------------------
Node.js Crash Course Tutorial #9 - MongoDB
------------------------------------------------------------------------------------------------------------------------------------------
{Part one: Intro}
MongoDB are arranged and structured in documents unlike in tables, they are NoSQL databases. 

Documents have a pair of key and value.
There are cloud and local databases. It is entirely up to you!
Cloud is defintely faster uwu

cluster is the unique database MongoDB

To connect our app to MongoDB
const dbURI = 'mongodb+srv://dunyanong:WTL6183@nodetuts.jzktfj6.mongodb.net/?retryWrites=true&w=majority';

{Part Two: Mongoose}
Mongoose is an object document mapping(ODM) library, a library that easily connects us to 
Mongo database.

Schemas define the structure of a data/document like in firebase

For example, you can have the schemas for users' accounts or blogs

How to install mongoose?
npm install mongoose

const mongoose = require('mongoose');

change your link's "test" keyword which indicates the test database. Replace it with your database name. (This is the previous version)
The current version is perfectly fine, no editing is required

const dbURI = 'mongodb+srv://dunyanong:WTL6183@nodetuts.jzktfj6.mongodb.net/nodetuts?retryWrites=true&w=majority';
mongoose.connect(dbURI);

mongoose.connect() is asynchrounous, hence we can use a promise!
For example,

mongoose.connect(dbURI)
    .then((request) => {
        console.log('Connected to DB')
    })
    .catch((err) => {
        console.log(err);
    })

Note: If you're facing any problems connecting to the cluster, 
make sure your ip is added to the  IP access list under network access tab.

If it does not work, why delete the IP address and add a new oneapp.get('/',(req,res)=>{
    

});

Creating schemas:
Create a folder in root directory called models. 
In models, create a file call blog.js. 
blog.js will manage the the schemas

In blog.js, 
This describe the model of document/schemas

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(object, optionObject);
// schemas
const blogSchema = new Schema({
    title: {
        type: String, 
        require: true,
    },
    snippet: {
        type: String, 
        require: true,
    },
    body: {
        type: String,
        require: true,
    }
}, {timestamps: true}); <---- automatically generate timestamp for us

Let's create a model. But wait, what's a model?
A model is something that surrounds the schemas, 
and provides us an interface to communicate with a database collection.

To create a model
const Blog = mongoose.model(nameOfModelInCapital, schema);
module.exports = Blog;

For example:
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;

The reason the name of the model is important
is because it's going to look at the name and pluralise and 
look for the collection in the database

{Part Three: Getting and Saving Data}
const Blog = require('./models/blog');

// mongoose and sandbox routes
app.get('/add-blog',(req, res) => {
    // creating a promise named Blog
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog',
    });

    blog.save() //<---- this save the data to the database
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

blog.save() is an asynchronous function so we can have then and catch methods

If user is not allowed to do action issues,
You can go to Atlas->Security->Database Access tab and add new user with Atlas admin role

How to get data from the collection:
Blog.find() gets us all the document from the collection and it is asynchonous

// Getting data from collection
app.get('/get-all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        })
})

{Part Three: Outputting documents in views}
This output all the document data in the visuals
blogs come from index.ejs

app.get('/blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result}) <--- This object is stored in index.ejs file
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }) <---- negative one meaning ascending order
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result}) 
        })
        .catch((err) => {
            console.log(err);
        })
})

------------------------------------------------------------------------------------------------------------------------------------------
Node.js Crash Course Tutorial #10 - Get, Post & Delete Requests
------------------------------------------------------------------------------------------------------------------------------------------
{Part One: Request type}
Get Request - to get resources from the server 
Post Request - to create new data (for example: creating a new blog)
Delete Request - to delete data (for example: deleting a blog)
Put Request - update data (for example: update a blog)

Note: We can use the same route(url) for different request

For example: 
localhost:3000/blogs can be a get request or a post request

{Part Two: Post Request}
-> To create new data

The action attribute tells us the value where the data comes from.
The action attribute has a router link

Method tells us the type of request
<form action="/blogs" method="POST"></form>

To allow the action attribute to work, we will need to use the name attribute. 
The name attribute will need to have the same name as the attribute in the collection.

To create a POST handler:
app.post('/blogs', (req, res) => {
    console.log(req.body)
});

The req. body object allows you to access data 
in a string or JSON object from the client side.

urlencoded() uses:
-> urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. 
app.use(express.urlencoded({ extended: true }));

This allow us to access the data in the name attribute.

POST handler for saving the data to the database
app.post('/blogs', (req, res) => {
    // a promise/instance
    const blog = new Blog(req.body);
  
    blog.save()
      .then(result => {
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
  });

{Part Three: Route Parameters}
The variable part of the route that may change value

In index.ejs:
<% if(blogs.length > 0) {%>
            <% blogs.forEach(blogs => { %>
                <a class="single" href="/blogs/<%= blogs._id %>">
                    <h3 class="title"><%= blogs.title%></h3>
                    <p class="snippet"><%= blogs.snippet%></p>
                </a>
            <% }) %>
The <%= blogs._id %> inputs the id of the blog

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
});

-> It must be :id or else express is going to treat it as id literally
-> The req.params property is an object containing properties mapped to the named route “parameters”. 
For example: 
if you have the route /student/:id, then the “id” property is available as req.params.id. 
This object defaults to {}

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            render('details', {title: 'Bog Details', blogs: result});
        })
        .catch(err => {
            console.log(err);
        })
});

findById() is a built-in method from moongoose

{Part Four: Delete Request}
In detail.ejs
<script>
    const trashcan = document.querySelector('a.delete');

    trashcan.addEventListener('click', (e) => {
      const endpoint = `/blogs/${trashcan.dataset.doc}`;
      fetch(endpoint, {
        method: "DELETE",
      })
      .then(() => {

      })
      .catch((err) => {
        console.log(err);
      })
    })
  </script>

dataset is to connect with data-doc
Look up MDN documentation for more

When we use fetch(), which is also an ajax request, in node we cannot use a redirect
as a response. We have to send JSON objects instead.
The JSON data has a redirect property.


------------------------------------------------------------------------------------------------------------------------------------------
Node.js Crash Course Tutorial #11 - Express Router & MVC
------------------------------------------------------------------------------------------------------------------------------------------
{Part One: express router}
Aim: To prevent repetitive codes of similar keyword in routers.

To import the router:
const router = express.Router();

app.use('/blogs', blogRoutes);
This mean it only applies blogRoutes when there is the /blogs route

{Part Two: MVC}
What is MVC?
MVC = model view controller

Aim: To modules the codes into smaller files

{Part Three: Controller}































*/