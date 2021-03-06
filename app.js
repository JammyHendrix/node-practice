const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions = {
	describe: "Title of Note",
	demand: true,
	alias: 't'
};

const argv = yargs
	.command('add', 'add a new note', {
		title: titleOptions,
		body: {
			describe: 'Body of Note',
			demand: true,
			alias: 'b'
		}
	})
	.command('list', 'list all notes')
	.command('read', 'read a note', {
		title: titleOptions,
	})
	.command('remove', 'Remove a note', {
		title: titleOptions,
	})
	.help()
	.argv;
var command = argv._[0];


if (command === 'add') {
	var note = notes.addNote(argv.title, argv.body);
	if (note) {
		console.log('Note Created');
		notes.logNote(note);
	} else {
		console.log('Note Title Taken');
	}
} else if (command === 'list') {
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`);
	allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
	var note = notes.getNote(argv.title);
	if (note) { 
		console.log('Note Found');
		notes.logNote(note);
	} else {
		console.log('Note Not Found');
	}
} else if (command === 'remove') {
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? 'Note was removed' : "Note not found";
	console.log(message);
} else {
	console.log('Command not recognized');
}






