const mineflayer = require('mineflayer'); // npm install mineflayer
const maxAPI = require("max-api");
const config = require("./config.json"); // use to update 
const { host, port, version, auth, username, password, } = config;

const bot = mineflayer.createBot({
    host: host,
    port: port,
    version: version,
    username: username, // you can change via config.json. Command block messages need to match user name!! See README.md
    // password: password, // uncomment for use on server
    // auth: auth, // uncomment for use on server.
  });
  
  bot.once('spawn', () => {
    console.log('MIDIbot has spawned in the world!');
  });
  
  bot.on('chat', function(username, message) {
    if (message) {
    maxAPI.outlet(message);  
}})

// an example of M4L sending messages into Minecraft. You can use this for Minecraft Commands!
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