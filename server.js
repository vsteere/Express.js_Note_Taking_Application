//dependencies
let express = require("express");
let fs = require("fs");
let db = require("./db/db.json");
let path = require("path");
const { error } = require("console");
let Add = require("./db/db");
const { rejects } = require("assert");

//Express Server
let app = express();

let PORT = process.env.PORT || 3000;

//sets up Express to handle data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Tells express that Public is the root directory to pull static files from
app.use(express.static(path.join(__dirname, "public")))


// //API routes
// //this gets the db.json file and returns the saved notes as JSON
// app.get("/api/notes", function (req, res) {
//   fs.readFile("db/db.json", "utf-8", function(err, data){
// if(err) throw err
// res.json(JSON.parse(data));

//   })
//   // res.json(db);
// });
app.get("/api/notes", (req, res) => {
  Add.readAllNotes().then(response => res.json(response))
  .catch(error => console.log(error)) 
});

//pulls the note and writes it in the db.json file
// app.post("/api/notes", function (req, res) {

//   fs.readFile("db/db.json", "utf-8", function (err, data) {
//     if (err) throw err
//     let newData = JSON.parse(data);
//     let addNote = { id: db.length + 1, title: req.body.title, text: req.body.text }
//     newData.push(addNote);
//     console.log(newData)
//     fs.writeFile("db/db.json", JSON.stringify(newData), function (err, data) {
//       if (err) throw err
//       // res.redirect("/notes");
//       // fs.readFile("db/db.json", "utf-8", function (err, data) {
//       if (err) throw err
//       res.end(data);

//       })
//     })


//   });

app.post("/api/notes", (req, res) => {
  Add.addNote(req.body).then(response => res.json(response))
  .catch(error => console.log(error)) 
});
  //the route to delete a note using a unique ID
  // app.delete("/api/notes/:id", function (req, res) {
  //   fs.readFile("db/db.json", function (err, data) {
  //     if (err) throw err
  //     let newData = JSON.parse(data);
  //     let newNotes = newData.filter(note => note.id != req.params.id)
  //     fs.writeFile("db/db.json", JSON.stringify(newNotes), function (err, data) {
  //       if (err) throw err
  //       res.end(data);
        
  //     })
      
  //   })
    
  // })
  app.delete("/api/notes/:id", (req, res) => {
    Add.deleteNote(req.params.id).then(response => res.json(response))
    .catch(error => console.log(error)) 
  });


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