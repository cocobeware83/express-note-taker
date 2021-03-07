var express = require("express");
var path = require("path");
var fs = require("fs")

//TODO --- set up the express app

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
    if (error) {
      return console.log(error)
    }
    notes = JSON.parse(notes)

    var id = notes[notes.length - 1].id + 1
    var newNote = { title: req.body.title, text: req.body.text, id: id }
    var activeNote = notes.concat(newNote)

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), function (error, data) {
      if (error) {
      res.json(activeNote);
    })
  })
})

// server listens
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });