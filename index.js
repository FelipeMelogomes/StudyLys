// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

// dot env
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

// importacao dos comandos
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	if ("data" in command && "execute") {
		client.commands.set(command.data.name, command)
	} else {
		console.log(`Esse comando em ${filePath} está com "data" ou "execute ausentes"`)
	}
}

// Login do bot
client.once(Events.ClientReady, c => {
	console.log(`Pronto! Login realizado como ${c.user.tag}`);
});
client.login(TOKEN);


// Listener de interações com o bot 
client.on(Events.InteractionCreate, async interection => {
	if (interection.isStringSelectMenu()) {
		const selected = interection.values[0]
		if (selected == "javascript"){
            await interection.reply("Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript")
        } else if (selected == "python"){
            await interection.reply("Documentação do Python: https://www.python.org")
        } else if (selected == "discordjs"){
            await interection.reply("Documentação do Discord.js: https://discordjs.guide/#before-you-begin")
        }
	}
	if (!interection.isChatInputCommand()) return
    const command = interection.client.commands.get(interection.commandName)
    if (!command) {
        console.error("Comando não encontrado")
        return
    }
    try {
        await command.execute(interection)
    } 
    catch (error) {
        console.error(error)
        await interection.reply("Houve um erro ao executar esse comando!")
    }
})

