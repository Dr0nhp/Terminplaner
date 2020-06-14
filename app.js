const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const fs = require('fs');
const { nextTick } = require('process');
const { timeStamp } = require('console');
const client = new Discord.Client();
let eventArray = [];   // initialization of event Array


client.once('ready', () => {
	console.log(v);
});


/************************************* adding functionality to array prototype *************************************/


//for debugging purposes - gives the last element of an array with ARRAY.last
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};


//checks for min value in any given array of objects and returns obejct with min.attribute
Array.prototype.hasMin = function(attrib) {
    return (this.length && this.reduce(function(prev, curr){ 
        return prev[attrib] < curr[attrib] ? prev : curr; 
    })) || NULL;
 }


/************************************* start of discord bot Terminplaner *************************************/


v = "Version 0.2"
const helptext = "Hallo!\nMit !befehle erhälst du eine Liste mit Befehlen.\nEs ist Egal, ob du deine Befehle GROSS oder klein schreibst.\nUm einen Termin anzulegen tippe:\n \"!Termin Terminname TeilnehmendePersonen Datum Uhrzeit\"\n ein.";
const befehle = "Folgende Befehle stehen derzeit zur Verfügung:\n!ping\n!hilfe\n!befehle\n!termin\n!version\n!speichern\n!nächster\n!alle";


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

		console.log(command, args) //Debug


/************************************* every possible command with prefix "!" *************************************/


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
			termin(args)
			message.channel.send(status)
			break;
		case "version":
			message.channel.send(v)
			break;
		case "debug":
			console.log(eventArray.length)
			console.log(eventArray[0])
			console.log(eventArray.last())
			break;
		case "speichern":
			save(eventArray)
			message.channel.send('Erfolgreich gespeichert')
			break;
		case "nächster":
			message.channel.send("Der nächste Termin ist:\n" + next(eventArray))
			break;
		case "alle":
			message.channel.send("Folgende Termine sind derzeit vorhanden:\n" + eventArray)
			break;
	}
});


/************************************* functionality and calls are down below *************************************/


function termin(argsArray) {
	if (argsArray.length < 4) {
		console.log("failed <4")
		status = "Die Terminerstellung war nicht erfolgreich.\nBitte nutze 4 Argumente zum erstellen von einem Termin.\n!Hilfe gibt dir eine Hilfestellung."
		return status;
	}
	//parseTime(argsArray[2],argsArray[3])
	console.log(typeof(argsArray[3]))
	Event = {
		Terminname: argsArray[0],
		Teilnehmer: argsArray[1],
		Datum: argsArray[2],
		Uhrzeit: argsArray[3],
		hidden: parseTime(argsArray[2],argsArray[3])
	};
	jsonData = JSON.stringify(Event);
	eventArray.push(jsonData)
	status = "Termin erfolgreich angelegt."
	return status;
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
	n = eventArray.hasMin("hidden")
	return(n)
}


function parseTime(date,time) {

	//expected dateformat dd.mm.(yyyy)
	dateArr = date.split('.')
	day = dateArr[0];
	month = parseInt(dateArr[1])-1
	year = dateArr[2];

	// if no year is given
	if (year == undefined){
		actualDate = new Date();
  	actualyear = actualDate.getFullYear();
	  year = actualyear.toString();
	}

	//time hh:mm
	timeArr = time.split(':')
	hh = timeArr[0];
	min = timeArr[1];

	givenDate =new Date(year,month,day,hh,min)

	timeNumber = Date.parse(givenDate);
	return timeNumber
}



client.login(token);