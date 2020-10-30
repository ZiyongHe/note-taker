const express = require("express")
const path = require("path")
const fs = require("fs")

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))



// Home page route
app.get("/", function (req, res) {
  // Send the html to screen
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

// Note page route
app.get("/notes", function (req, res) {
  // Send the html to screen
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});

// GET api notes route
app.get("/api/notes", function (req, res) {
  // Send the html to screen
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw error
    res.json(JSON.parse(data))
  })
})

// POST api notes route
app.post("/api/notes", function (req, res) {
  const note = req.body
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err
    const allNotes = JSON.parse(data)
    allNotes.push(note)
    allNotes.forEach(note => {
      note.id = allNotes.indexOf(note)
    })
    fs.writeFile("db/db.json", JSON.stringify(allNotes), (err) => {
      if (err) throw err
      res.json(allNotes)
    })
  })
})

// DELETE API notes route
app.delete("/api/notes/:id", function (req, res) {
  const {id} = req.params
  fs.readFile("db/db.json", "utf8", (error, data) => {
    if (error) throw error
    let allNotes = JSON.parse(data)
    allNotes = allNotes.filter((item) => item.id !== id)
    fs.writeFile("db/db.json", JSON.stringify(allNotes), (err) => {
      if (err) throw err
      res.send("Note deleted.")
    })
  })
})


// Port listener
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT)
})

