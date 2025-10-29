import { ObjectId } from "mongodb"
import { deleteOneMessage, findMessages, findOneMessage, insertMessage, updateOneMessage } from "../../models/controllers/messages/messages.controller.js"
import { findOneFile } from "../../models/controllers/storage/storage.controller.js"
import { findOneUser } from "../../models/controllers/users/users.controller.js"
import redisClient from "../../configs/redis.config.js"
import { io } from "../../app.js"

export const sendMessageService = async (receiverId, data, requester) => {
  let { content, files } = data

  if (!content && !files)
    throw new Error("Message Not Have Any File Or Text Content", { cause: { code: 400 } })

  if (content.length > 500)
    throw new Error("Content Can't Get Upper Of 500 Length", { cause: { code: 400 } })


  if (typeof content !== 'string')
    throw new Error("Contecnt Type of 'content' Key Must Be String", { cause: { code: 400 } })

  const receiver = await findOneUser({ _id: receiverId })

  if (!receiver)
    throw new Error("User Not Found With This receiverId", { cause: { code: 404 } })

  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = await findOneFile({ _id: files[i] })
      if (!file)
        delete files[i]
    }
  }

  files = files.filter((item) => item !== null)

  const newMessage = {
    receiver_id: new ObjectId(receiver._id),
    sender_id: new ObjectId(requester._id),
    content,
    files,
    seen: false,
    edited: false
  }

  const message = await insertMessage(newMessage)

  const receiverSocketId = await redisClient.hGet("usersIdToSocketId", receiver._id.toString())
  if (receiverSocketId)
    io.to(receiverSocketId).emit("newMessage", message)

  return message
}

export const seenMessageService = async (messageId, requester) => {
  const message = await findOneMessage({ _id: messageId, receiver_id: requester._id })
  console.log({ _id: messageId, receiver_id: requester._id }, message);

  if (!message)
    throw new Error("Message Not Found!", { cause: { code: 404 } })

  if (message.seen)
    throw new Error("Message Alredy Is Seened", { cause: { code: 400 } })

  const update = await updateOneMessage({ _id: messageId, receiver_id: requester._id }, { seen: true })

  const receiverSocketId = await redisClient.hGet("usersIdToSocketId", message.sender_id.toString())
  console.log(receiverSocketId);
  if (receiverSocketId)
    io.to(receiverSocketId).emit("seenMessage", update)

  return update
}

export const getMessagesService = async (receiverId, requester, filters) => {
  let desc = filters.desc == "true" ? true : false, search = filters.search
  let messages = await findMessages({
    $or: [
      { receiver_id: new ObjectId(receiverId), sender_id: new ObjectId(requester._id) },
      { receiver_id: new ObjectId(requester._id), sender_id: new ObjectId(receiverId) }
    ]
  }, desc)

  if (search)
    messages = messages.filter((item) => item.content.includes(search))

  return messages
}

export const editMessageService = async (messageId, data, requester) => {
  const { content } = data

  if (typeof content !== 'string')
    throw new Error("Contecnt Type of 'content' Key Must Be String", { cause: { code: 400 } })

  if (content.length > 500)
    throw new Error("Content Can't Get Upper Of 500 Length", { cause: { code: 400 } })


  const message = await findOneMessage({ _id: messageId, sender_id: requester._id })

  if (!message)
    throw new Error("Message Not Found!", { cause: { code: 404 } })

  const update = await updateOneMessage({ _id: messageId, sender_id: requester._id }, { content, edited: true })

  const receiverSocketId = await redisClient.hGet("usersIdToSocketId", message.receiver_id.toString())

  if (receiverSocketId)
    io.to(receiverSocketId).emit("editMessage", update)

  return update
}

export const deleteMessageService = async (messageId, requester) => {
  const message = await findOneMessage({ _id: messageId, sender_id: requester._id })

  if (!message)
    throw new Error("Message Not Found!", { cause: { code: 404 } })

  await deleteOneMessage({ _id: messageId, sender_id: requester._id })

  const receiverSocketId = await redisClient.hGet("usersIdToSocketId", message.receiver_id.toString())

  if (receiverSocketId)
    io.to(receiverSocketId).emit('deleteMessage', message)

  return null
}