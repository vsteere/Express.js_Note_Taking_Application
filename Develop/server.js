//dependencies
let express = require("express");
let fs = require("fs");
let db = require("./db/db.json");
let path = require("path");

//Express Server
let app = express();

let PORT = 3000;

//sets up Express to handle data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML routes

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

// //API routes
// //this gets the db.json file and returns the saved notes as JSON
app.get("/api/notes", function(req, res) {
    res.json(db);
  });
//pulls the note and posts it in teh db.json file
 app.post("/api/notes", function(req, res) {
    db.push(req.body);
      });











//starts the server
work.listen(PORT, function () {
console.log("App listening on PORT: " + PORT);
});