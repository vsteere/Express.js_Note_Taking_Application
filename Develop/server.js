//dependencies
let express = require("express");
let fs = require("fs");
let db = require("./db/db.json");
let path = require("path");
const { error } = require("console");

//Express Server
let app = express();

let PORT = 3000;

//sets up Express to handle data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))


// //API routes
// //this gets the db.json file and returns the saved notes as JSON
app.get("/api/notes", function (req, res) {
  res.json(db);
});
//pulls the note and posts it in the db.json file
app.post("/api/notes", function (req, res) {


  fs.readFile("db/db.json", "utf-8", function (err, data) {
    if (err) throw err
    let newData = JSON.parse(data);
    let newNote = { id: db.length + 1, title: req.body.title, text: req.body.text }
    newData.push(newNote);
    console.log(newData)
    fs.writeFile("db/db.json", JSON.stringify(newData), function (err, data) {
      if (err) throw err
      // res.redirect("/notes");
      // fs.readFile("db/db.json", "utf-8", function (err, data) {
      if (err) throw err
      res.json(data);

      })
    })


  });
  app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("db/db.json", "utf-8", function (err, data) {
      if (err) throw err
      let newData = JSON.parse(data);
      let newNotes = newData.filter(note => note.id != req.params.id)
      fs.writeFile("db/db.json", JSON.stringify(newNotes), function (err, data) {
        if (err) throw err
        res.json(data);
        return res.redirect("/notes")
      })
      
    })
    
  })







  //HTML routes

  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });


  //starts the server
  app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
  });