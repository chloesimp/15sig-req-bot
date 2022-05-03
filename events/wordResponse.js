const client = require("../index")
const wordTimer = require("../models/wordTimer")
const moment = require("moment")

client.on("messageCreate", async message => {
    if (message.author.bot) return
    if (!message.guild) return

    if (/\bchechnya\b/i.test(message.content)) {
        chechnya()
    }

    async function checkForMultipleTriggerWords() {
        const string = message.content.toLowerCase()

        // if (string.includes("chechnya")) {
        //     const responses = [
        //         "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA",
        //         "Dude I dont live in Chechnya",
        //         "Where did you get Chechnya from",
        //         "??? I dont even live near in or near Chechnya",
        //         "I dont live in Chechnya",
        //         "fucking stop already i dont fucking live in chechnya",
        //         "I SAID I DONT LIVE IN CHECHNYA",
        //         "I dont live in chechnya"
        //     ]

        //     const random = Math.floor(Math.random() * responses.length)
        //     await message.reply({ content: responses[random] })
        // }

        if (string.includes("spam")) {
            await message.reply({ content: "Spam is so fucking gross, I can't believe you americans actually like that slimy shit" })
        }

        if (string.includes("chechen")) {
            await message.reply({ content: "I swear to fucking god if you mention chechnya one more time im gonna go over to where you live, rip out your head and fuck the fresh hole that I just made"  })
        }
    }

    // else if (/\bchechen\b/i.test(message.content)) {
    //     message.reply({ content: "I swear to fucking god if you mention chechnya one more time im gonna go over to where you live, rip out your head and fuck the fresh hole that I just made" })
    // } else if (/\bspam\b/i.test(message.content)) {
    //     message.reply({ content: "Spam is so fucking gross, I can't believe you americans actually like that slimy shit" })
    // }

    checkForMultipleTriggerWords()

    async function chechnya() {
        const userID = message.author.id

        const schema = await wordTimer.findOne({
            userID
        })

        if (!schema) {
            await message.reply({
                content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA"
            })
            await wordTimer.create({
                timestamp: moment().add(10, "s").unix(),
                userID,
                responseNumber: 1
            })
        } else {
            if (moment().unix() < schema.timestamp && schema.responseNumber === 1) {
                const responses = [
                    "Dude I dont live in Chechnya",
                    "Where did you get Chechnya from",
                    "??? I dont even live near in or near Chechnya",
                    "I dont live in Chechnya"
                ]

                const random = Math.floor(Math.random() * responses.length)
                await message.reply({
                    content: responses[random]
                })
                await wordTimer.updateOne({
                    userID
                }, {
                    responseNumber: 2
                })
            } else if (moment().unix() > schema.timestamp && schema.responseNumber === 1) {
                schema.deleteOne({
                    userID
                })
                await wordTimer.create({
                    timestamp: moment().add(10, "s").unix(),
                    userID,
                    responseNumber: 1
                })
                await message.reply({
                    content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA"
                })
            } else if (moment().unix() < schema.timestamp && schema.responseNumber === 2) {
                const responses = [
                    "fucking stop already i dont fucking live in chechnya",
                    "I SAID I DONT LIVE IN CHECHNYA"
                ]

                const random = Math.floor(Math.random() * responses.length)
                await message.reply({
                    content: responses[random]
                })
                await wordTimer.updateOne({
                    userID
                }, {
                    responseNumber: 3
                })
            } else if (moment().unix() > schema.timestamp && schema.responseNumber === 2) {
                schema.deleteOne({
                    userID
                })
                await wordTimer.create({
                    timestamp: moment().add(10, "s").unix(),
                    userID,
                    responseNumber: 1
                })
                await message.reply({
                    content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA"
                })
            } else if (moment().unix() < schema.timestamp && schema.responseNumber === 3) {
                await message.reply({
                    content: "I dont live in chechnya"
                })
                await wordTimer.updateOne({
                    userID
                }, {
                    responseNumber: 4
                })
            } else if (moment().unix() > schema.timestamp && schema.responseNumber === 3) {
                schema.deleteOne({
                    userID
                })
                await wordTimer.create({
                    timestamp: moment().add(10, "s").unix(),
                    userID,
                    responseNumber: 1
                })
                await message.reply({
                    content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA"
                })
            } else if (moment().unix() < schema.timestamp && schema.responseNumber === 4) {
                await message.reply({
                    content: "I dont live in chechnya"
                })
                await wordTimer.updateOne({
                    userID
                }, {
                    responseNumber: 4
                })
            } else if (moment().unix() > schema.timestamp && schema.responseNumber === 4) {
                schema.deleteOne({
                    userID
                })
                await wordTimer.create({
                    timestamp: moment().add(10, "s").unix(),
                    userID,
                    responseNumber: 1
                })
                await message.reply({
                    content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA"
                })
            } else {
                schema.deleteOne({
                    userID
                })
                await wordTimer.create({
                    timestamp: moment().add(10, "s").unix(),
                    userID,
                    responseNumber: 1
                })
                await message.reply({
                    content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA"
                })
            }
        }
    }
})