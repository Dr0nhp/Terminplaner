# Terminplaner
Simple Discord Scheduler

## Installing
To use this code you need [Nodejs](https://nodejs.org/) and [Discord,js](https://discord.js.org/).

## Starting
To Start the Bot you simply need to start node.js with the app.js within your commandline.
```
node app.js
```

## Using
The Bot is developed for german users. So all of the commands are in german language. As the rest of the code is written in english it should be easy to translate. You cannot create Events on passed Dates. Passed events are deleted every 60 minutes.


## Commands
The prefix ! is required for all commands. All writing cases are supported.

### ping
Response with a Pong. Why? Because!

### hilfe
Respones with some general help and hints to the "Befehle" command.

### befehle
Gives all available commands despite debug.

### termin
Is for adding an Event. The Syntax is as follows:
```
!termin NameOfTheEvent ParticipatingPersons DateOfEvent TimeOfEvent
```
Please be aware of the usage of spaces in between arguments.

The date notation is:
```
DD.MM(.YYYY)
```
Year is an optional parameter if not set - it will use the current year as input.

The time notaion is:
```
HH:MM
```

### version
Responds with the versionnumber.

### debug
Offers debuginformation for the EventArray. Will probably delted.

### speichern
Saves the EventArray as storage.json on the machine where the server runs. Just a fallback if the bot gets killed. 

### nächster
Respondes with the next occuring event. Shows the whole Event Object. It's ugly.

### alle
Respondes the eventArray. It's even uglier.

### auto
Is for autosave every 60 minutes. The saveinterval is changeable at const saveTime. Time has to be in ms. so 60 minutes are 3600000 ms.
Also toggles the switch for activating autosave.

### schalter
Respondes if the autosave is toggled on (True) or off (False).



