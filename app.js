const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const fs = require('fs');
//const { nextTick } = require('process');
const client = new Discord.Client();


client.once('ready', () => {
	console.log(v);
});

//initialization of the Event array
let eventArray = [];

//for debugging purposes - gives the last element of an array with ARRAY.last
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

//Stackexchange
//checks for min value in any given array of objects and returns obejct with min.attribute
Array.prototype.hasMin = function(attrib) {
    return (this.length && this.reduce(function(prev, curr){ 
        return prev[attrib] < curr[attrib] ? prev : curr; 
    })) || NULL;
 }



v = "Version 0.0.15"
const helptext = "Hallo!\nMit !befehle erhälst du eine Liste mit Befehlen.\nEs ist Egal, ob du deine Befehle GROSS oder klein schreibst.";
const befehle = "Folgende Befehle stehen derzeit zur Verfügung:\n!ping\n!hilfe\n!befehle\n!termin\n!version";


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

		console.log(command, args) //Debug


	switch (command) {
		case "ping":
			message.channel.send('Pong.')
			break;
		case "hilfe":
			message.channel.send(helptext)
			break;
		case "befehle":
			message.channel.send(befehle)
			break;
		case "termin":
			add(termin(args))
			message.channel.send('Termin angelegt.')
			break;
		case "version":
			message.channel.send(v)
			break;
		case "debug":
			console.log(eventArray.length)
			console.log(eventArray[0])
			console.log(eventArray.last())
			break;
		case "save":
			save(eventArray)
			message.channel.send('Erfolgreich gespeichert')
			break;
		case "nächster":
			message.channel.send(next(eventArray))
			break;
		case "alle":
			message.channel.send(eventArray)
			break;
	}
});


function termin(argsArray) {
	Event = {
		Terminname: argsArray[0],
		Teilnehmer: argsArray[1],
		Datum: argsArray[2],
		Uhrzeit: argsArray[3],
		erinnerung: argsArray[4]
	};
	jsonData = JSON.stringify(Event);
	return jsonData;
}


function add(jsonData) {
	eventArray.push(jsonData) 
return(0)
}


function save(eventArray) {
	fs.writeFile("./storage.json",eventArray, function(err) {
		if (err) {
			console.log(err)
		}
	})
	return(0)
}


function next(eventArray) {
	n = eventArray.hasMin("datum")
	return(n)
}


client.login(token);