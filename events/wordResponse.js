const chechnyaWordTimer = require("../models/chechnyaWordTimer")
const moment = require("moment")
const spamWordTimer = require("../models/spamWordTimer")
const client = require("../index")

client.on("messageCreate", async message => {
    if (message.author.bot) return
    if (!message.guild) return

    if (/\bchechnya\b/i.test(message.content)) {
        chechnya()
    } else if (/\bspam\b/i.test(message.content)) {
        spam()
    }

    // else if (/\bgeorgia\b/i.test(message.content)) {
    //     await message.reply({ content: "GEROGEI" })
    // } else if (/\bchimi changa\b/i.test(message.content)) {
    //     await message.reply({ content: "Chiambab" })
    // } else if (/\bchi chis\b/i.test(message.content)) {
    //     await message.reply({ content: "chiambab" })
    // } else if (/\bigor\b/i.test(message.content)) {
    //     await message.reply({ content: "https://cdn.discordapp.com/attachments/912576964617973770/970692550803456090/unknown.png" })
    // }

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

        // if (string.includes("spam")) {
        //     await message.reply({ content: "Spam is so fucking gross, I can't believe you americans actually like that slimy shit" })
        // }

        if (string.includes("chechen")) {
            await message.reply({ content: "I swear to fucking god if you mention chechnya one more time im gonna go over to where you live, rip out your head and fuck the fresh hole that I just made" })
        }

        if (string.includes("georgia")) {
            await message.reply({ content: "GEROGEI" })
        }

        if (string.includes("chimi changa")) {
            await message.reply({ content: "Chiambab" })
        }

        if (string.includes("chi chis")) {
            await message.reply({ content: "chiambab" })
        }

        if (string.includes("igor")) {
            await message.reply({ content: "https://cdn.discordapp.com/attachments/912576964617973770/970692550803456090/unknown.png" })
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

        const chechnyaSchema = await chechnyaWordTimer.findOne({
            userID
        })

        if (!chechnyaSchema) {
            await message.reply({
                content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA"
            })
            await chechnyaWordTimer.create({
                timestamp: moment().add(300, "s").unix(),
                userID,
                responseNumber: 1
            })
        } else {
            if (moment().unix() < chechnyaSchema.timestamp && chechnyaSchema.responseNumber === 1) {
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
                await chechnyaWordTimer.updateOne({
                    userID
                }, {
                    responseNumber: 2
                })
            } else if (moment().unix() > chechnyaSchema.timestamp && chechnyaSchema.responseNumber === 1) {
                chechnyaSchema.deleteOne({
                    userID
                })
                await chechnyaWordTimer.create({
                    timestamp: moment().add(300, "s").unix(),
                    userID,
                    responseNumber: 1
                })
                await message.reply({
                    content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA"
                })
            } else if (moment().unix() < chechnyaSchema.timestamp && chechnyaSchema.responseNumber === 2) {
                const responses = [
                    "fucking stop already i dont fucking live in chechnya",
                    "I SAID I DONT LIVE IN CHECHNYA"
                ]

                const random = Math.floor(Math.random() * responses.length)
                await message.reply({
                    content: responses[random]
                })
                await chechnyaWordTimer.updateOne({
                    userID
                }, {
                    responseNumber: 3
                })
            } else if (moment().unix() > chechnyaSchema.timestamp && chechnyaSchema.responseNumber === 2) {
                chechnyaSchema.deleteOne({
                    userID
                })
                await chechnyaWordTimer.create({
                    timestamp: moment().add(300, "s").unix(),
                    userID,
                    responseNumber: 1
                })
                await message.reply({
                    content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA"
                })
            } else if (moment().unix() < chechnyaSchema.timestamp && chechnyaSchema.responseNumber === 3) {
                await message.reply({
                    content: "I dont live in chechnya"
                })
                await chechnyaWordTimer.updateOne({
                    userID
                }, {
                    responseNumber: 4
                })
            } else if (moment().unix() > chechnyaSchema.timestamp && chechnyaSchema.responseNumber === 3) {
                chechnyaSchema.deleteOne({
                    userID
                })
                await chechnyaWordTimer.create({
                    timestamp: moment().add(300, "s").unix(),
                    userID,
                    responseNumber: 1
                })
                await message.reply({
                    content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA"
                })
            } else if (moment().unix() < chechnyaSchema.timestamp && chechnyaSchema.responseNumber === 4) {
                await message.reply({
                    content: "I dont live in chechnya"
                })
                await chechnyaWordTimer.updateOne({
                    userID
                }, {
                    responseNumber: 4
                })
            } else if (moment().unix() > chechnyaSchema.timestamp && chechnyaSchema.responseNumber === 4) {
                chechnyaSchema.deleteOne({
                    userID
                })
                await chechnyaWordTimer.create({
                    timestamp: moment().add(300, "s").unix(),
                    userID,
                    responseNumber: 1
                })
                await message.reply({
                    content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA"
                })
            } else {
                chechnyaSchema.deleteOne({
                    userID
                })
                await chechnyaWordTimer.create({
                    timestamp: moment().add(300, "s").unix(),
                    userID,
                    responseNumber: 1
                })
                await message.reply({
                    content: "IM NOT FROM CHECHNYA YOU STUPID FUCKING WESTOID RETARD IM FROM THE CAUCAUSES REGIONS NEAR MT ELBRUS, ELBRUUUS, IN RUSSIA"
                })
            }
        }
    }

    async function spam() {
        const userID = message.author.id

        const spamSchema = await spamWordTimer.findOne({
            userID
        })

        const unix = moment().unix()

        if (!spamSchema) {
            await message.reply({
                content: "Spam is so fucking gross, I can't believe you americans actually like that slimy shit"
            })

            await spamWordTimer.create({
                timestamp: moment().add(300, "s").unix(),
                userID,
                responseNumber: 1
            })
        } else {
            if (unix < spamSchema.timestamp && spamSchema.responseNumber === 1) {
                const responses = [
                    'it\'s so fucking gross how do you people eat that shit',
                    'disgusting slimy western mystery meat, yuck',
                    'i dont even know what spam is made out of'
                ]

                const random = Math.floor(Math.random() * responses.length)

                await message.reply({
                    content: responses[random]
                })

                await spamWordTimer.updateOne({ userID }, { responseNumber: 2 })
            } else if (unix > spamSchema.timestamp && spamSchema.responseNumber === 1) {
                spamSchema.deleteOne({
                    userID
                })

                await spamWordTimer.create({
                    timestamp: moment().add(300, "s").unix(),
                    userID,
                    responseNumber: 1
                })

                await message.reply({
                    content: "Spam is so fucking gross, I can't believe you americans actually like that slimy shit"
                })
            } else if (unix < spamSchema.timestamp && spamSchema.responseNumber === 2) {
                const responses = [
                    'STOP FUCKING TALKING ABOUT SPAM I\'M GONNA GET SICK',
                    'ITS SO BAD HOW DO YOU WESTOIDS ACTUALLY LIKE THAT SHIT'
                ]

                const random = Math.floor(Math.random() * responses.length)

                await message.reply({
                    content: responses[random]
                })

                await spamWordTimer.updateOne({ userID }, { responseNumber: 3 })
            } else if (unix > spamSchema.timestamp && spamSchema.responseNumber === 2) {
                spamSchema.deleteOne({
                    userID
                })

                await spamWordTimer.create({
                    timestamp: moment().add(300, "s").unix(),
                    userID,
                    responseNumber: 1
                })

                await message.reply({
                    content: "Spam is so fucking gross, I can't believe you americans actually like that slimy shit"
                })
            } else if (unix < spamSchema.timestamp && spamSchema.responseNumber === 3) {
                await message.reply({
                    content: "STFU TUSHONKA SUPERIOR"
                })
            } else if (unix > spamSchema.timestamp && spamSchema.responseNumber === 3) {
                spamSchema.deleteOne({
                    userID
                })

                await spamWordTimer.create({
                    timestamp: moment().add(300, "s").unix(),
                    userID,
                    responseNumber: 1
                })

                await message.reply({
                    content: "Spam is so fucking gross, I can't believe you americans actually like that slimy shit"
                })
            } else {
                spamSchema.deleteOne({
                    userID
                })

                await spamWordTimer.create({
                    timestamp: moment().add(300, "s").unix(),
                    userID,
                    responseNumber: 1
                })

                await message.reply({
                    content: "Spam is so fucking gross, I can't believe you americans actually like that slimy shit"
                })
            }
        }
    }
})