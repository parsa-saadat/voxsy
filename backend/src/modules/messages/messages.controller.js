import { deleteMessageService, editMessageService, getMessagesService, seenMessageService, sendMessageService } from "./messages.service.js";

export const sendMessageController = async (req, res) => {
  try {
    const message = await sendMessageService(req.params.userId, req.body, req.files, req.user);
    res.status(201).json({
      body: message,
      status: 201,
      message: 'Message Send Successfully',
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
};

export const seenMessageController = async (req, res) => {
  try {
    const message = await seenMessageService(req.params.id, req.user);
    res.status(200).json({
      body: message,
      status: 200,
      message: 'Message Seened Successfully',
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
export const getMessagesController = async (req, res) => {
  try {
    const messages = await getMessagesService(req.params.userId, req.user, req.query);
    res.status(200).json({
      body: messages,
      status: 200,
      message: 'Messages Fetched Successfully',
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

export const editMessageController = async (req, res) => {
  try {
    const message = await editMessageService(req.params.id, req.body, req.user);
    res.status(200).json({
      body: message,
      status: 200,
      message: 'Messages Updated Successfully',
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

export const deleteMessageController = async (req, res) => {
  try {
    const message = await deleteMessageService(req.params.id, req.user);
    res.status(200).json({
      body: message,
      status: 200,
      message: 'Messages Deleted Successfully',
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