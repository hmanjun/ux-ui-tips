const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostic.json').then((data) => {
    res.json(JSON.parse(data))
  })
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const {user, tip,topic} = req.body.errors
  if(user && tip && topic){
    const diagFile = {
      "time": "new",
      "error_id": "new",
      "errors": {
        tip,
        topic,
        user
      }
    }
    readAndAppend(diagFile,'./db/diagnostic.json')
    res.json(`${req.method} method recieved, and saved`)
  } else {
    res.json("A failure occured")
  }
});

module.exports = diagnostics;
