//dependencies
let express = require("express");
let fs = require("fs");

//Express Server
let work = express();

let PORT = 3000

//sets up Express to handle data

work.use(express.urlencoded({ extended: true }));
work.use(express.json());

//HTML routes

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));

app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "index.html"));

//API routes



























        //starts the server
        work.listen(PORT, function () {
            console.log("App listening on PORT: " + PORT);
        });

