import { findMessages } from "../../models/controllers/messages/messages.controller.js"
import { findUsers } from "../../models/controllers/users/users.controller.js"

export const getChatListService = async (requester) => {
  const users = await findUsers()

  const unseenMessages = {}
  const promises = users.map(async (user) => {
    const messages = await findMessages({ sender_id: user._id, receiver_id: requester._id, seen: false })

    if (messages.length > 0)
      unseenMessages[user._id] = messages.length
  })

  await Promise.all(promises)

  return { unseenMessages, users }
}