const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const fs = require('fs');
const { nextTick } = require('process');
const { timeStamp } = require('console');
const client = new Discord.Client();
let eventArray = new Array();
let jsonArray = new Array();    				// initialization of event Array
let flag = false;
const saveTime = 3600000; 						//3600000 = 1h;  300000 = 5min; 5000 = 5 sek
const maintenanceTime = 5000;

client.once('ready', () => {
	console.log(v);
});

setInterval(function() { maintain(); }, maintenanceTime);
setInterval(function() { autosave(flag); }, saveTime);

/************************************* adding functionality to array prototype *************************************/


												//for debugging purposes - gives the last element of an array with ARRAY.last
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};


												//checks for min value in any given array of objects and returns smallest value object
Array.prototype.hasMin = function(attrib) {
    return (this.length && this.reduce(function(prev, curr){ 
        return prev[attrib] < curr[attrib] ? prev : curr; 
    })) || null;
 }


/************************************* start of discord bot Terminplaner *************************************/


v = "Version 1.0.5"
const helptext = "Hallo!\nMit !befehle erhälst du eine Liste mit Befehlen.\nEs ist Egal, ob du deine Befehle GROSS oder klein schreibst.\nUm einen Termin anzulegen tippe:\n \"!Termin Terminname TeilnehmendePersonen Datum Uhrzeit\"\n ein.";
const befehle = "Folgende Befehle stehen derzeit zur Verfügung:\n!ping: sendet ein Pong zurück\n!hilfe sendet den Hilfetext\n!befehle öffnet diese Liste mit Befehlen\n!termin legt einen Termin an: Die Folgende Syntax ist zu beachten:\n\n!Termin Terminname TeilnehmendePersonen Datum Uhrzeit\n\n!version: Gibt die Versionsnummer zurück\n!speichern: speichert alle Termine in einer .json Datei \n!nächster: Zeigt den nächsten Termin an\n!alle: Zeigt alle angelegten Events an\n!auto: Schaltet das Autospeichern um\n!schalter: Zeigt den Status des Autospeicherns an.\n";


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	console.log(command, args) 					


/************************************* every possible command with prefix "!" *************************************/


	switch (command) {
		case "ping":													//done
			message.channel.send('Pong.')
			break;
		case "hilfe":													//done
			message.channel.send(helptext)
			break;
		case "befehle":													//done
			message.channel.send(befehle)
			break;
		case "termin":													//done
			termin(args)
			message.channel.send(status)
			break;
		case "version":													//done
			message.channel.send(v)
			break;
		case "debug":
			break;
		case "speichern":
			save(jsonArray)
			message.channel.send('Erfolgreich gespeichert')
			break;
		case "nächster":
			if (eventArray.length < 1){break;}
			event_ =(next(eventArray))
			message.channel.send("Der nächste Termin \"" + event_.Terminname + "\" ist am " + event_.Datum + " um "+ event_.Uhrzeit + ". Teilnehmer ist/sind: " + event_.Teilnehmer )
			break;
		case "alle":													//done
			message.channel.send("Folgende Termine wurden bisher angelegt:\n" + jsonArray)
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

	jsondata = JSON.stringify(Event)
	jsonArray.push(jsondata)
	eventArray.push(Event)
	status = "Termin erfolgreich angelegt."
	return(status)
}


function save(jsonArray) {																				
	fs.writeFile("./storage.json",jsonArray, function(err) {
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


function parseTime(date,time) {					//expected dateformat dd.mm.(yyyy)

	dateArr = date.split('.')
	day = dateArr[0];
	month = parseInt(dateArr[1])-1				//months start with 0 so if User types "1" for january - system thinks he means February 
	year = dateArr[2];

	if (year == undefined){						// if no year is given, year is set to current year
		actualDate = new Date();
  		actualyear = actualDate.getFullYear();
		year = actualyear.toString();
	}

	timeArr = time.split(':')					//time hh:mm
	hh = timeArr[0];
	min = timeArr[1];
	givenDate = new Date(year,month,day,hh,min)
	timeNumber = Date.parse(givenDate);
	return(timeNumber)
}


function rebuildDeleteEntry(eventArray){

	//Check if array is empty -> early exit
	if (eventArray.length < 1) {
		return(eventArray)
	}
	//If passed we get the next Event as Object back, get its time value and get actual time
	nearestEvent = next(eventArray)
	timeOfNextEvent = nearestEvent.hidden
	actualTime = Date.parse(new Date)
	// Check if the the next event is past actual time -> Cut that element from array
	if (timeOfNextEvent < actualTime) {		
		eventArray = eventArray.filter(function(el) { return el.hidden > actualTime; });
		return (eventArray)
	}
	return(eventArray)
}


function autosave(flag) {
	if (flag == true){
		save(eventArray)
		console.log("Saved")
	}
};


function maintain() {
	eventArray = rebuildDeleteEntry(eventArray)
	return(eventArray)
};


client.login(token);