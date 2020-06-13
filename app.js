const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const fs = require('fs');
const client = new Discord.Client();

client.once('ready', () => {
	console.log(v);
});

v = "Version 0.0.8"
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
			break;
		case "version":
			message.channel.send(v)
			break;
	}
});


// TODO !zeitplan


/*
func termin(array) legt aus Argumenten die mit !termin mitkamen ein JS Objekt an und wandelt es in ein JSON Argument um.
!termin Meeting, Testgruppe, 25.05.2020, 18:00, 1  <- So Sieht ein Beispielhafter Termin aus.
*/

function termin(argsArray) {

	event = {
		bezeichnung: argsArray[0],
		gruppe: argsArray[1],
		datum: argsArray[2],
		zeit: argsArray[3],
		erinnerung: argsArray[4]
	};

	jsonData = JSON.stringify(event);
	return jsonData;
}


function add(jsonData) {
	fs.writeFile("./storage.json",jsonData, function(err) {
		if (err) {
			console.log(err)
		}
	})
}

client.login(token);



//  const dummyData = JSON.parse(await fs.readFileSync(dirname + "/dummyData.json", "utf8"))
//  dummyData.user.push(user)
//  await fs.writeFileSync(dirname + '/dummyData.json', JSON.stringify(dummyData))


//const dummyData = JSON.parse(await fs.readFileSync(dirname + "/dummyData.json", "utf8"))
//dummyData.user.push(user)
//await fs.writeFileSync(dirname + '/dummyData.json', JSON.stringify(dummyData))