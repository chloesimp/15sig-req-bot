const client = require("../index");

client.on("ready", async () => {
    console.log(`${client.user.tag} is up and ready to go!`)
    client.user.setActivity("you", { type: "WATCHING" })

    const channel = client.channels.cache.get("971093316982673428")
    channel.send({ content: `Bot is online (${new Date()})` })
});
