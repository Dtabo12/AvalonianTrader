const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config/access.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
	console.log(`${c.user.username} has connected`);
});

client.login(token);