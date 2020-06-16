# Terminplaner
S simple Discord bot for scheduling Events. You can create Events and display the next event.

## Prerequisites
To use this code you need [Nodejs](https://nodejs.org/) and [Discord,js](https://discord.js.org/).
You also need your own Discord application token which you can get from [Discord.com/Developers](https://discord.com/developers/applications). 
Click and fill required fields: 
* New Application
* Bot
* Copy Token

The token should then pasted into the config.json file at "token".

```
{
	"prefix": "!",
	"token": "Your Token goes here"
}
```

## Starting
To Start the Bot you simply need to start node.js with the app.js within your commandline.
```
node app.js
```
## Localization
The Bot is developed for german users. So all of the commands are in german. As the code is written in english it should be easy to translate.

## Using
You can PM the bot to create events, or you can talk to the bot in public channels. All of the following commands are typed into Discord. Please be aware of the commands and responses are in german.
The main features are shown below.

### Create event
To create an event you type:
```
!termin NameOfTheEvent ParticipatingPersons DateOfEvent TimeOfEvent
```
Please be aware of the spaces in between arguments.

### Display next event
```
!nächster
```

### List of available commands (and description of them)
```
!befehle
```

### Generic help
```
!hilfe
```
