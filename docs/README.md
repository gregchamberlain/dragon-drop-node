# dragon-drop.com node
## Background

Node.js backends can be extremely powerful and flexible due to the vast amount of node packages available, as well as the bare-bones nature of a simple node backend. Unlike Ruby on Rails theres not a whole lot of set convention defined when creating a backend in node. This enables the developer to create it in their own way, that they think is best for the specific project. Making backends in node is also very intriguing for development of web applications for companies because a team of JavaScript engineers can work on both the front and back ends relatively interchangeably.

In this project I will be creating a Node.js backend for my full stack project [dragon-drop.com](https://www.github.com/gregchamberlain/dragon-drop). I will be using the express framework to handle http requests, mongodb as a database, and ejs as a templating language for the initial html page (this is so I can pass currentUser data back with the initial request if a user is already authenticated).

## MVP
- [ ] Server hosted on heroku
- [ ] Backend that accepts http requests and adds data to mongodb
- [ ] Similar back end API to my Ruby on Rails project.
- [ ] Make minor changes to front end to adjust for differences in the API.
- [ ] Close to the same functionality as the original site.

## Wireframes

Due to the fact that this is strictly a backend project, with few behind the scenes tweaks make to the frontend data handling I don't see a need for wireframes for this project. [Here](https://github.com/gregchamberlain/dragon-drop/tree/master/docs/wireframes) is a link to the wireframes for the Rails implementation that will also be applicable to this project.

## Technologies

#### Node.js
This project will be build on top of node.js and be running JavaScript on both the server, and client portions of the application.

#### Express
Express is the node framework I will be using to handle the http request/response cycle for the back end of the application.

#### MongoDB
MongoDB is the NoSQL database I will storing the information for my application in. It is much more dynamic,yet ensures less consistency than a SQL database. Due to its flexibility the schema of my data will be altered a bit from my original applciation. Users, and Sites will have the same schema. Pages will also have the same base Schema, however instead of having a seperate Components schema all components will be nested in the pages schema as an array of objects (with the same structure as the Component schema from my Rails version).

#### Mongoose
Mongoose is the ORM I will be utilizing to communicate with MongoDB from my node backend. Mongoose allows for the creation of Schemas and models that enable validations, and structure for saved documents (NoSQL databases have `Collections`[similar SQL Tables], that hold documents[similar to SQL rows], which are just JSON objects).

## Timeline
**Day 1**: Created the file structure of the application and get an express server up and running.
- npm init
- server folder with app.js to hold entry to the server.
- client folder that will hold the frontend code from the original project.

**Day 2**: Mongoose schema models for `Users`, `Sites`, `Pages`, and backend auth.
- Fully working backend auth with same structure as Rails app.
- models folder holding each `User`, `Site`, and `Page` model.

**Day 3**: Setup routes to handle API requests.
- Similar routes to the Rails API.

**Day 4**: Modify frontend to ensure compatibility with Node API.
- Some API endpoints will be different and need to be adjusted in the fronend.
- How `Component`s are created and destroyed on the backend is different than in the Rails implementation so the    `Component` Redux cycle will need to modified.
