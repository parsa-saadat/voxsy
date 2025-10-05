import { getChatListService } from "./chats.service.js";

export const getChatListController = async (req, res) => {
  try {
    const messages = await getChatListService(req.user);
    res.status(200).json({
      body: messages,
      status: 200,
      message: 'Chat List Fetched Successfully',
      success: true,
    });
  } catch (e) {
    res.status(e.cause?.code || 500).json({
      body: null,
      status: e.cause?.code || 500,
      message: e.message,
      success: false,
    });
  }
}