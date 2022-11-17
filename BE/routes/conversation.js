const router = require('express').Router()
const Conversation = require("../models/Conversation");


// create a conversation

router.post("/", async (req, res) => {
   const newConversations = new Conversation({
     members:[req.body.senderId,req.body.receiverId]
   })
   try {
      const saveConversation = await newConversations.save()
      res.status(200).json(saveConversation)
   } catch (error) {
     console.log(error);
   }
})

// get a conversation

router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members:{ $in:[req.params.userId]}
        })
        res.status(200).json(conversation)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;