const client = require("../index")
const wordTimer = require("../models/wordTimer")
const moment = require("moment")

client.on("messageCreate", async message => {
    if (message.author.bot) return
    if (!message.guild) return

    if (/\bchechnya\b/i.test(message.content)) {
        chechnya()
    } else if (/\bchechen\b/i.test(message.content)) {
        message.reply({ content: "I swear to fucking god if you mention chechnya one more time im gonna go over to where you live, rip out your head and fuck the fresh hole that I just made" })
    } else if (/\bspam\b/i.test(message.content)) {
        message.reply({ content: "Spam is so fucking gross, I can't believe you americans actually like that slimy shit" })
    }

    async function chechnya() {        
        const userID = message.author.id

        const schema = await wordTimer.findOne({ userID })

        if (!schema) {
            await message.reply({ content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA" })
            wordTimer.create({
                timestamp: moment().add(10, "s").unix(),
                userID
            })
        } else {
            if (moment().unix() < schema.timestamp) {
                await message.reply({ content: "im not from chechnya" })
            } else if (moment().unix() > schema.timestamp) {
                schema.deleteOne({ userID })
                wordTimer.create({
                    timestamp: moment().add(10, "s").unix(),
                    userID
                })
                await message.reply({ content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA" })
            }
        }

        // await message.reply({ content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA" })

    }   
})