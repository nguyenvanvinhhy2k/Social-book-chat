const router = require('express').Router()
const Messager = require("../models/Messager");

// send messager

router.post("/", async (req, res) => {
    const newMessager = new Messager(req.body)
    try {
        const saveMessage = await newMessager.save()
        res.status(200).json(saveMessage)
    } catch (error) {
      console.log(error);
    }
})

// get messages by conversation

router.get("/:conversationId", async (req, res) => {
    try {
        const messagerConversation = await Messager.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messagerConversation)
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;