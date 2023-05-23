# mcM4L
 Send data between Minecraft (Java) and Ableton Live/Max for Live

This script can use Minecraft chat messages to communicate with Max for Live.
Similarly, messages can be sent from Max for Live to generate Minecraft commands via a Mineflayer bot.

Tested and working on Minecraft Java Edition 1.19.2. Ableton Suite 11 required.
I've tested it on MacOs, and it should work on Windows.

Step 1: Install node.js if you haven't already. https://nodejs.org/en 

Step 2: Open your Minecraft world.

Step 3: Open the [singleplayer] Minecraft world to LAN (hit ESC, select "Open to LAN", select "Creative" and "Allow Cheats"). Minecraft will display a port number in the chat.

Step 4: Copy the given port number the 4th line of the config.json file (inside quotations)

----------------

In Ableton, drag an instance of mcM4L.amxd to a MIDI track. If you have updated your config.json file with a port number, you should be able to toggle the script with the big X. Your Mineflayer bot should spawn in your world. I've found that it's more stable to edit the Max for Live patch without the script running. 

Create your MIDI instrument tracks and give them meaninful names (without spaces!)

Then drag an instance of mcM4L_Chat2Instrument.amxd to each of your MIDI instrument tracks.

From here, decide if you want to use the "Specify_Duration" mode or the "NoteOn/Off" mode.
⋅⋅⋅ "Specify_Duration" mode requires that you specify a note lenght in ms (1000ms = 1 second)
⋅⋅⋅ "NoteOn/Off" mode requires separate messages for note on and note off.

See below for specific syntax:

----------------

### Minecraft Chat syntax:

## Specify_Duration
-- For note of specified duration: ```TrackName 5 64 100 2000```
        will create the MIDI note# 64 with a velocity of 100 and a duration of 2000 ms on a track called "TrackName". Replace this with whatever you want, but make sure the Track in Ableton Live is exactly the same (case sensitive).

## NoteOn/Off
-- for note on messages: ```TrackName 3 36 80``` 
        will create a NOTE-ON message for MIDI note# 36 on with a velocity of 80 on a track called "TrackName". Replace this with whatever you want, but make sure the Track in Ableton Live is exactly the same (case sensitive).

-- for note off messages: ```TrackName 3 36 0```
        will create a NOTE-OFF message for MIDI note# 36 on with a velocity of 80 on a track called "TrackName". Replace this with whatever you want, but make sure the Track in Ableton Live is exactly the same (case sensitive).

-- for MIDI panic (all notes off): ```TrackName panic```
        will turn off all notes on the track called "TrackName". Similarly, the command ```panic``` will turn off all notes on all tracks with this device.

## Command Block Syntax

Use the following syntax to create MIDI messages with command blocks (note the included chat syntax):
```/execute as @p[name=M4L_bot] at @p run say duration 11 60 100 1000```
Note, the username of your Mineflayer bot needs to match in this command. Replace "M4L_bot" on servers.

## Sending Data from Ableton/Max for Live to Minecraft
The project contains some provisions for commands created at the whim of some Max for Live messages sent to the mcM4L.js script. 
![alt text](/images/M4L_messagesToMC.png "Max for Live Messages")

These lines of code from mcM4L.js pertain to the messages you see in the image above:

```javascript
    maxAPI.addHandler("M4L_message", () =>  {
    bot.chat("/give @a command_block")
    }); 

    maxAPI.addHandler("midiMiddleC", () =>  {
    bot.chat("/execute as @e[type=minecraft:player] at @s run particle minecraft:heart ~9 ~ ~ 1 1 1 0.05 50");
    bot.chat("/execute as @e[type=minecraft:player] at @s run particle minecraft:heart ~-9 ~ ~ 1 1 1 0.05 50");
    bot.chat("/execute as @e[type=minecraft:player] at @s run particle minecraft:heart ~ ~ ~9 1 1 1 0.05 50");
    bot.chat("/execute as @e[type=minecraft:player] at @s run particle minecraft:heart ~ ~ ~-9 1 1 1 0.05 50");
    }); 

    maxAPI.addHandler('midiCC_10', (value) =>  {
    bot.chat(`/execute as @e[type=minecraft:player] at @s run particle minecraft:flame ~20 ~${value} ~ 1 1 1 .05 5`);
	bot.chat(`/execute as @e[type=minecraft:player] at @s run particle minecraft:flame ~-20 ~${value} ~ 1 1 1 .05 5`);
	bot.chat(`/execute as @e[type=minecraft:player] at @s run particle minecraft:flame ~ ~${value} ~20 1 1 1 .05 5`);
	bot.chat(`/execute as @e[type=minecraft:player] at @s run particle minecraft:flame ~ ~${value} ~-20 1 1 1 .05 5`);
    });
```


<a href="https://drive.google.com/file/d/1mFNc2gM2d7aWTR61Ohf56RJFWv4qIFNw/view?usp=share_link" target="_blank">Download a demo Minecraft world</a> and a connected <a href="https://drive.google.com/file/d/1jnUtdZBBTk2MUmn9QgVS_p8OEe48UdoP/view?usp=share_link" target="_blank">Ableton Live Set</a>. 

See the <a href="https://youtu.be/K2F6CGtxqBQ" target="_blank">YouTube video</a> for more details.

<a href="https://youtu.be/K2F6CGtxqBQ" target="_blank"><img src="http://img.youtube.com/vi/K2F6CGtxqBQ/0.jpg" 
alt="mcM4L Demo Video" width="480" height="360" border="0" /></a>
