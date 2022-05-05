require("dotenv").config()
const { Client, Collection, Intents, WebhookClient } = require("discord.js");
const util = require("util")

const client = new Client({
    intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

client.login(process.env.token);

console.log = (data) => {
    const webhook = new WebhookClient({ url: process.env.consoleWebhook })

    webhook.send({
        content: util.format(data)
    })

    console.log(util.format(data))
}

process.on("uncaughtException", async (err) => {
    const webhook = new WebhookClient({ url: process.env.errWebhook })
    
    console.log(err.stack)
    webhook.send({
        content: `An Error Has Occured!\n\`\`\`${err.stack}\`\`\``
    })
    console.log("Node.js is not exiting")
})

process.on("unhandledRejection", async err => {
    const webhook = new WebhookClient({ url: process.env.errWebhook })
    
    console.log(err.stack)
    webhook.send({
        content: `An Error Has Occured!\n\`\`\`${err.stack}\`\`\``
    })
    console.log("Node.js is not exiting")
})