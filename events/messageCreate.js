const client = require("../index")

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return
    if (message.author.id !== "398752205043400724") return

    
    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases ?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});
