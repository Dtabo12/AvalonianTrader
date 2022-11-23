const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config/access.json');

// funtions requires
const command = require('./commands/help');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
});

client.once(Events.ClientReady, c => {
	console.log(`${c.user.username} has connected!`);

	const { readdirSync } = require('node:fs');
	c.commands = new Collection();

	/* Event Handler */
	for (const file of readdirSync('./events/')) {
		if (file.endsWith('.js')) {
			let fileName = file.substring(0, file.length - 3);
			let fileContent = require(`./events/${file}`);
			c.on(fileName, fileContent.bind(null, c));
			delete require.cache[require.resolve(`./events/${file}`)];
		}
	}

	/* Command Handler */
	for (const file of readdirSync('./commands/')) {
		if (file.endsWith('.js')) {
			let fileName = file.substring(0, file.length - 3);
			let fileContent = require(`./commands/${file}`);
			c.commands.set(fileName, fileContent);
		}
	}

});

client.login(token);