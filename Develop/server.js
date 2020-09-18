//dependencies
let express = require("express");

//Express Server
let work = express();

let PORT = 3000

//sets up Express to handle data

work.use(express.urlencoded({ extended: true }));
work.use(express.json());

























//starts the server
work.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  
