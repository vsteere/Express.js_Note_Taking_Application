let fs = require("fs");
let util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
read() {
return readFileAsync("db/db.json", "utf-8")
}
write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note))
}

readAllNotes() {
return this.read().then(response => [...JSON.parse(response)] )

}

addNote({title, text}) {
    let addNote = { id: Math.floor(Math.random() * 1000), title, text  }
    
    return this.readAllNotes()
    .then(response => [...response, addNote]).then(response => this.write(response)).then(() => this.readAllNotes())
}

deleteNote(id) {
    return this.readAllNotes()
    .then(response => response.filter(note => note.id != id)).then(response => this.write(response)).then(() => this.readAllNotes())

}

};

module.exports = new DB() 


