import { ObjectId } from "mongodb"
import { deleteOneMessage, findMessages, findOneMessage, insertMessage, updateOneMessage } from "../../models/controllers/messages/messages.controller.js"
import { findOneFile } from "../../models/controllers/storage/storage.controller.js"
import { findOneUser } from "../../models/controllers/users/users.controller.js"

export const sendMessageService = async (reciverId, data, requester) => {
  let { content, files } = data

  if (!content && !files)
    throw new Error("Message Not Have Any File Or Text Content", { cause: { code: 400 } })

  if (content.length > 500)
    throw new Error("Content Can't Get Upper Of 500 Length", { cause: { code: 400 } })


  if (typeof content !== 'string')
    throw new Error("Contecnt Type of 'content' Key Must Be String", { cause: { code: 400 } })

  const reciver = await findOneUser({ _id: reciverId })

  if (!reciver)
    throw new Error("User Not Found With This ResiverId", { cause: { code: 404 } })

  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = await findOneFile({ _id: files[i] })
      if (!file)
        delete files[i]
    }
  }

  files = files.filter((item) => item == null)

  const newMessage = {
    resiver_id: new ObjectId(reciver._id),
    sender_id: new ObjectId(requester._id),
    content,
    files,
    seen: false,
    edited: false
  }

  return await insertMessage(newMessage)
}

export const seenMessageService = async (messageId, requester) => {
  const message = await findOneMessage({ _id: messageId, resiver_id: requester._id })

  if (!message)
    throw new Error("Message Not Found!", { cause: { code: 404 } })

  if (message.seen)
    throw new Error("Message Alredy Is Seened", { cause: { code: 400 } })

  return await updateOneMessage({ _id: messageId, resiver_id: requester._id }, { seen: true })
}

export const getMessagesService = async (resiverId, requester, filters) => {
  let desc = filters.desc == "true" ? true : false, search = filters.search
  let messages = await findMessages({ resiver_id: resiverId, sender_id: requester._id }, desc)

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

  return await updateOneMessage({ _id: messageId, sender_id: requester._id }, { content, edited: true })
}

export const deleteMessageService = async (messageId, requester) => {
  const message = await findOneMessage({ _id: messageId, sender_id: requester._id })

  if (!message)
    throw new Error("Message Not Found!", { cause: { code: 404 } })

  return await deleteOneMessage({ _id: messageId, sender_id: requester._id })
}