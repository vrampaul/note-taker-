// DEPENDENCIES
const util = require("util");
const fs = require("fs");
const { v4: uuid4 } = require("uuid");

// make fs.readFile promise-based
// make fs.appendFile promise-based
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// class of helper functions
class DbFunctions {
	// getNotes()
	// uses readFileAsync function to read the notes in db.json
	// returns the notes
	async getNotes() {
		try {
			const notes = await readFileAsync("db/db.json", "utf8");
			return JSON.parse(notes);
		} catch (err) {
			throw err;
		}
	}
	// writeNotes(notes)
	// takes in notes to be written
	// uses writeFileAsync to write the notes to db.json
	async writeNotes(notes) {
		try {
			return await writeFileAsync("db/db.json", JSON.stringify(notes));
		} catch (err) {
			throw err;
		}
	}

	// addNote(note)
	// add a note to the notes in db.json
	async addNote(note) {
		try {
			// get notes in db.json
			const notes = await this.getNotes();
			// get the title and text values of the user's note to be added
			const { title, text } = note;
			// if any fields are missing, throw an error
			if (!title || !text) {
				throw new Error("Missing required fields!");
			}
			// create a new note in db.json
			// note contains the same title and text but add a unique id
			const newNote = { title, text, id: uuid4() };
			// add the note to the existing ones
			notes.push(newNote);
			// write it to db.json
			await this.writeNotes(notes);
			return note;
		} catch (err) {
			return err;
		}
	}

	// deleteNote(id)
	// delete a note from db.json
	// id parameter is id of the note to be deleted
	async deleteNote(id) {
		try {
			// get notes in db.json
			const notes = await this.getNotes();
			// go through the notes and keep only the ones that do not match the id
			const newNotes = notes.filter((note) => note.id !== id);
			// write the notes to db.json
			await this.writeNotes(newNotes);
			// get the updated notes in db.json and return them
			const updatedNotes = await this.getNotes();
			return updatedNotes;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = DbFunctions;
