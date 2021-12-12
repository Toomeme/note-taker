const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = app => {

    // initialize notes variable
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);
    
        // initialize the notes get route
        app.get("/api/notes", (req, res) => {
            res.json(notes);
        });

        // initialize the notes post route
        app.post("/api/notes", (req, res) => {
            let newNote = req.body;
            newNote.id = uuidv4();
            notes.push(newNote);
            updateDb();
            res.json(notes);
            return console.log("Added new note: "+newNote.title);
            
        });

        // Retrieves a note with specific id
        app.get("/api/notes/:id", (req,res) => {
            // display json for the notes array indices of the provided id
            res.json(notes[req.params.id]);
            console.log("got note with id "+req.params.id);
        });

        // Deletes a note with specific id
        app.delete("/api/notes/:id", (req, res) => {
            notes.splice(req.params.id, 1);
            updateDb();
            res.json(notes);
            console.log("Deleted note with id "+req.params.id);
        });

        app.get('/notes', (req,res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        app.get('*', (req,res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates the json file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}