const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const fs = require('fs');
const { nextTick } = require('process');
const { timeStamp } = require('console');
const client = new Discord.Client();
let eventArray = [];   // initialization of event Array
let flag = false;


client.once('ready', () => {
	console.log(v);
});

setInterval(function() { wartung(flag); }, 3600000);		//maintan

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


v = "Version 0.4.1"
const helptext = "Hallo!\nMit !befehle erhälst du eine Liste mit Befehlen.\nEs ist Egal, ob du deine Befehle GROSS oder klein schreibst.\nUm einen Termin anzulegen tippe:\n \"!Termin Terminname TeilnehmendePersonen Datum Uhrzeit\"\n ein.";
const befehle = "Folgende Befehle stehen derzeit zur Verfügung:\n!ping: sendet ein Pong zurück\n!hilfe sendet den Hilfetext\n!befehle öffnet diese Liste mit Befehlen\n!termin legt einen Termin an: Die Folgende Syntax ist zu beachten:\n!Termin Terminname TeilnehmendePersonen Datum Uhrzeit\n\n!version: Gibt die Versionsnummer zurück\n!speichern: speichert aktuell verfügbare Termine in einer .json Datei \n!nächster: Zeigt den nächsten Termin an\n!alle: Zeigt alle Events an\n!auto: Schaltet das Autospeichern um\n!schalter: Zeigt den Status des Autospeicherns an.\n";


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
		case "auto":
			flag = flag ? false : true;
			message.channel.send("Der automatische Speichermodus ist auf\n" + flag)
			break;
		case "schalter":
			message.channel.send(flag)
			break;
	}
});


/************************************* functionality and calls are down below *************************************/


function termin(argsArray) {
	if (argsArray.length < 4) {
		console.log("failed <4")
		status = "Die Terminerstellung war nicht erfolgreich.\nBitte nutze 4 Argumente zum erstellen von einem Termin.\n!Hilfe gibt dir eine Hilfestellung."
		return(status);
	}
	time = parseTime(argsArray[2],argsArray[3])
	if (time < Date.parse(new Date)) {
		status = "Dein Termin liegt in der Vergangenheit. :-("
		return(status)
	}
	

	Event = {
		Terminname: argsArray[0],
		Teilnehmer: argsArray[1],
		Datum: argsArray[2],
		Uhrzeit: argsArray[3],
		hidden: time
	};

	jsonData = JSON.stringify(Event);
	eventArray.push(jsonData)
	status = "Termin erfolgreich angelegt."
	return(status)
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
	if (eventArray.length = 0) {
		return(0)
	}
	n = eventArray.hasMin("hidden")
	return(n)
}


function parseTime(date,time) {
	//expected dateformat dd.mm.(yyyy)
	dateArr = date.split('.')
	day = dateArr[0];
	month = parseInt(dateArr[1])-1				//months start with 0 so if User types "1" for january - system thinks he means February 
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
	givenDate = new Date(year,month,day,hh,min)
	timeNumber = Date.parse(givenDate);
	return(timeNumber)
}


function delteOldEntries(){
	nearestEvent = next(eventArray).hidden
	actualTime = Date.parse(new Date)
	if (nearestEvent < actualTime) {
		var eventArray = eventArray.filter(function(el) { return el.hidden != nearestEvent; });
	}
	return(0)
}


function wartung(flag) {
	if (flag == true){
		save(eventArray)
		console.log("Saved")
	}
	delteOldEntries()
	return(0)
};


client.login(token);