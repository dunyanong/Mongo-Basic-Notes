// NodeJS Notes

/*
------------------------------------------------------------------------------------------------------------------------------------------
Node.js Crash Course Tutorial #2 - Node.js Basics
------------------------------------------------------------------------------------------------------------------------------------------
fs.file
{Part One: NodeJS Logging basic}
Aim: Create a node server to power the backend of a website and handle browsers
In terminal, if you want to run the codes in a javascript file type: node filenameWithoutTheExtensionDotJS


{Part Two: The Global Object}
In the browser, window object is the default global object
In NodeJS, the global object is global

Global object(disgusting lol)
--> You can see there are some default functions, such as setInterval,setTimeout etc
--> setInterval run every predetermined time
--> clearInterval stops the setInterval at a predetermined time

Example: 
setTimeout(() => {
  console.log('in the timeout');
  clearInterval(int);
}, 3000);

const int = setInterval(() => {
  console.log('in the interval');
}, 1000);

{Part three: __dirname vs __filename}

__dirname gets us the absolute path of the current directory (which is NodeJS Crash Course in our case)
__filename gets us the absolute path of the current filename (which is global.js)

console.log(__dirname);
console.log(__filename)

Warning, we cannot access to many document or window of DOM properties as NodeJS is under the global
AND WE DONT NEED TO HAHA LMAO

{Part four: modules and require}

In modules.js file, we can put:
const xyr = require('./people');

---> people is people.js file. 
---> xyr is an empty object
---> That means we are importing things into the modules.js file from people.js
---> Just because the file people.js is imported, 
     this does not mean we can access it manually in other files. 
----> We can only access the infos in that file only

How can we access the data in other files with your file's functions, console.log() etc
---> We use module.exports = yourVariableOrObject
---> Remember to put your module.exports in the file with the data or info that you want to export. 

Example:
In people.js
const people = ['yoshi', 'ryu', 'chun-li', 'mario'];
const ages = [20, 25, 30, 35];

module.exports = {
    people, 
    ages
};

In modules.js
const xyr = require('./people');

console.log(xyr.people + xyr.ages)

{Part five: destructured modules}
You may select some specific properties out, for example

In modules.js
const {people, ages} = require('./people');

console.log(people, ages);

{Part six: OS module}
--> Built-in in nodejs
--> It tells us a lot of information about 
    the operating system that is currently running

const os = require('os');
console.log(os.platform(), os.homedir())

platform() tells us the current version of the operating system
homedir() tells us the root directory

{Part seven: file system}
fs module stands for file system module
const fs = require('fs');

To read files:
fs.readFile(yourFilePathOrAddress, arrowFunction that will be fired);
---> fs.readFile() only takes in two arguments
---> It is asynchronous, which means it allow the faster codes to run first

fs.readFile('./docs/blog1.txt', (err, data) => {
    if (err) {
        console.log(err);
    };
    console.log(data.toString());
})

To write files:
fs.writeFile()
---> Takes in three arguments
---> It is asynchronous, which means it allow the faster codes to run first

fs.writeFile(yourFilePath/fileAdress, yourMessage, arrowFunction that is being ran when it is fired)

fs.writeFile('./docs/blog1.txt', 'This is a new message from fs.writeFile', () => {
    console.log('New message has been logged')
})

Note: If you use a file that is not in the directory, the system will create a file for you by default!

To create a folder:

fs.mkdir(directoryName, callbackFunction)
fs.mkdir('newDirectory', (err) => {
    if (err) {
        console.log(err)
    };
    console.log('A new directory has been created!')
})

Note: You will get an error object if you try to create a directory with the same file name
To check whether if have an identical file with the same name....
fs.existsSync(directoryName) will log out 'true' if there is an identical file with the same name 

! meaning NOT
if (!fs.existsSync('newDirectory')){
    fs.mkdir('newDirectory', (err) => {
        if (err) {
            console.log(err)
        };
        console.log('A new directory has been created!')
    })
}

To delete a directory:
fs.rmdir(DirectoryName, arrowFunction)


To delete a file:
fs.unlink(filename, arrowFunction)

if (fs.existsSync('./docs/deleteFile.txt')){
    fs.unlink('./docs/deleteFile.txt', (err) => {
        if (err) {
            console.log(err);
        };
        console.log('file has been deleted')
    })
}

{Part seven: streams and buffer}
Benefit of using stream: 
We can start using some of the data before the data is 
fully read like a river stream lol

Buffer: Small chunks of data in the stream

There are two types of stream: read-stream and write stream

For Readstream:
use fs.createReadStream(filePath, encoding)

readStream.on('data', arrowFunction)
similar to event listener:
--> 'data' meaning the long data from the large file

const readStream = fs.createReadStream(`./docs/blog3.txt`);

readStream.on('data', (chunk) => {
    console.log('------- New Chunk ----------');
    console.log(chunk.toString());
});

OR

const readStream = fs.createReadStream(`./docs/blog3.txt`, { encoding: 'utf8'});
readStream.on('data', (chunk) => {
    console.log('------- New Chunk ----------');
    console.log(chunk);
});

For Write-stream:
fs.writeReadStream(newFilePath)

const writeStream = fs.writeReadStream(`./docs/blog4.txt`)

readStream.on('data', (chunk) => {
    console.log('------- New Chunk ----------');
    console.log(chunk);

    writeStream.write(`\nNew Chunk\n`)
    writeStream.write(chunk);

});

Shortcut: Pipe
--> I know "pipe", LMAO
--> The process of passing data from a readible stream to a writable stream
--> Downside, you cannot add new message of text in the new file!
--> Basically replacing the code below:

readStream.on('data', (chunk) => {
    console.log('------- New Chunk ----------');
    console.log(chunk);

    writeStream.write(`\nNew Chunk\n`)
    writeStream.write(chunk);

});

Better code:
readStream.pipe(writeStream);

*/

/*
------------------------------------------------------------------------------------------------------------------------------------------
Node.js Crash Course Tutorial #3 - Clients & Servers
------------------------------------------------------------------------------------------------------------------------------------------
{Part One: IP Adresses and Domains}
Communication's instructon between Server and client is called HTTP

{Part Two: Creating a server}
Sadly, in nodejs unlike php lmao, we have to manually create a server

Goal: Create a server to actively listen and repond to request

const http = require('http');
const server = http.createServer(callBackFunction);

const server = http.createServer((req, res) => {

});

Both req are objects that contain valuable info:
--> req gives us the request info such as URL and the request type(GET, POST etc)
--> res gives us the response object that we use to actually send a reponse to the user in the browser

How to actively listen for request?
server.listen(portNumber, hostName, callbackFunction)

---> We will talk more about portNumber in the future
---> host name by default is 'localhost'
---> Again, callBackFunction starts listening when we are listenign request in that moment

Example:
const server = http.createServer(callBackFunction);

const server = http.createServer((req, res) => {
    console.log('server has been manually created')
});

server.listen(3000, 'localhost', () => {
    console.log('listening request on port 3000')
})

{Part Three: LocalHost and Portnumber}
Local Host:
---> Like a domain name on web
---> So you are creating a server on your computer for your computer

local host --> Loopback IP Address 127.0.0.1 ---> Your own computer


Port Numbers: 
--> The past few number of IP address to go to specific websites
--> Think of it as a "door" to other websites
--> The common portnumber for local web development is 3000

control C - to stop the port from running 
sudo killall node - to delete all existing nodes from running 


------------------------------------------------------------------------------------------------------------------------------------------
Node.js Crash Course Tutorial #4 - Requests & Responses
------------------------------------------------------------------------------------------------------------------------------------------
{Part One: Requests}

To get the request object:
const server = http.createServer((req, res) => {
    console.log(req);
});

To find specific info in the request object........
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
});

method = type of request: GET/ POST etc
url = your url, it has be '/', which means the root 

{Part Two: Response object}

We need to create a response header to 
get info about the response like the file format: JSON, HTML, Text etc

To set header content type:
use res.setHeader('Content-Type', yourContentType)

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // to set header content type
    res.setHeader('Content-Type', 'text/plain')
});

How to send the response object message to the browser?
res.write(yourMessage)
res.end() <---- To end the response to send the data to the browser


const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // to set header content type
    res.setHeader('Content-Type', 'text/plain')

    res.write('hello ninja');
    res.end();

});

What about HTML tags instead?
change the content type from 'text/plain' ---> 'text/html'
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // to set header content type
    res.setHeader('Content-Type', 'text/html')

    res.write('<head><link rel="stylesheet" href="#"></head');
    res.write('<p> Jack of all trades </p>');
    res.end();

});

This method has repeated codes like multiples res.write()
Use file system:
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // to set header content type
    res.setHeader('Content-Type', 'text/html')

    fs.readFile('filePath', (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else{
            res.write(data);
            res.end();
        }
    })

});

{Part Three: Basic Routing}
--> Use switch statement

let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            break;
        case 'about':
            path += 'about.html';
            break;
        default:
            path += '404.html';
            break;
    };

---> path is put into the filepath aurgument
fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })



{Part Four: Status Code}
--> Status code describes the type of reponse is sent to the browser. 

100 - informational reponse
200 - success codes
300 - codes for redirects
400 - user or client error codes 
500 - server error codes

example for setting the specific codes:
res.statusCode = yourCode;

switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    };

{Part Five: Redirects}
What is redirects: a technique to link a link to another same link that existed

Why do we need redirects: 
--> let's say you created a website link, 
but the user typed a word is that is similar to it, which are too common. 
--> We can use redirects to change status codes


    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me': <---- An example of a redirects
            res.statusCode = 301; <---- This means the recourses that you re trying to access has been permanetly moved
            res.setHeader('Location', '/about');
            res.end();
        default:
            path += '404.html';
            res.statusCode = 404;
            break;

------------------------------------------------------------------------------------------------------------------------------------------
Node.js Crash Course Tutorial #5 - NPM 
------------------------------------------------------------------------------------------------------------------------------------------
{Part One: 3rd party packages}
NPM is automatically installed on your computer when you installed node
Example: download react/ vue and nodemon

Nodemon is used to allow us to stop the repetition of creating a new server

{Part Two: Installing Packages Globally}
npm install -g nodemon <----- For Windows
sudo npm install -g nodemon <----- For Mac and Linux

MAGIC TIME: To run ther server....
Instead of this...
node server 

Use this....
nodemon server

We don't have to use stupid control C after this. 

{Part Three: package.json file and instally packages locally}

All about package.json file
--> package file is a json file that keeps track of any packages 
that we install locally to our project.

--> npm init is used to create the package.json file. 

All about package-lock.json file
--> You have to create it manually without using the terminal.
--> It will list all of the different versions of dependencies. 
--> You do not have to edit it.

Installing Packages locally:
npm i  --save packageName

--save is used to make track the records of dependencies in package.json

lodash package:
--> Note: The codes must be in createServer method

To start the lodash packages:
1) Install it on terminal
2) const _ = require('lodash');
'_' is used as convention, you can use any other variable

    _.random()
    ---> To generate random numbers

    const num = _.random(0, 20) <--- This gives us a number between 0 and 20 inclusively
    console.log(num);

    _.once()
    ---> To allow functions to run once
    
    const greet = _.once(() => {
        console.log('hello world')
    });

    greet(); <--- This function will be logged
    greet(); <-- This function will NOT be logged

{Part Four: Dependencies and Sharing Code}

To download all dependencies:
npm install















*/

