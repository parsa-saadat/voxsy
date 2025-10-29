import db from '../../../configs/mongodb.config.js';

import { ObjectId } from 'mongodb';

// insert

export const insertMessage = async (data) => {
  const insert = await db.collection('messages').insertOne({
    ...data,
    create_at: new Date(),
    update_at: new Date(),
  });

  const insertDocument = await db.collection('messages').findOne({
    _id: insert.insertedId,
  });

  return insertDocument
};

// update

export const updateMessages = async (field, data) => {
  if (field?._id) {
    field._id = new ObjectId(field._id);
  }
  if (field?.receiver_id) {
    field.receiver_id = new ObjectId(field.receiver_id);
  }
  if (field?.sender_id) {
    field.sender_id = new ObjectId(field.sender_id);
  }

  const update = await db.collection('messages').updateOne(field, {
    $set: {
      ...data,
      update_at: new Date(),
    },
  });

  return update;
};

export const updateOneMessage = async (field, data) => {
  if (field?._id) {
    field._id = new ObjectId(field._id);
  }
  if (field?.receiver_id) {
    field.receiver_id = new ObjectId(field.receiver_id);
  }
  if (field?.sender_id) {
    field.sender_id = new ObjectId(field.sender_id);
  }

  const update = await db.collection('messages').updateOne(field, {
    $set: {
      ...data,
      update_at: new Date(),
    },
  });

  const updateDocument = await db.collection('messages').findOne(field);

  return updateDocument;
};

// find

export const findMessages = async (field, desc) => {
  if (field?._id) {
    field._id = new ObjectId(field._id);
  }
  if (field?.receiver_id) {
    field.receiver_id = new ObjectId(field.receiver_id);
  }
  if (field?.sender_id) {
    field.sender_id = new ObjectId(field.sender_id);
  }
  if (desc) return await db.collection('messages').find(field).sort({ _id: -1 }).toArray();
  return await db.collection('messages').find(field).toArray();
};

export const findOneMessage = async (field) => {
  if (field?._id) {
    field._id = new ObjectId(field._id);
  }
  if (field?.receiver_id) {
    field.receiver_id = new ObjectId(field.receiver_id);
  }
  if (field?.sender_id) {
    field.sender_id = new ObjectId(field.sender_id);
  }
  const find = await db.collection('messages').findOne(field);
  return find;
};

// delete

export const deleteOneMessage = async (field) => {
  if (field?._id) {
    field._id = new ObjectId(field._id);
  }
  if (field?.receiver_id) {
    field.receiver_id = new ObjectId(field.receiver_id);
  }
  if (field?.sender_id) {
    field.sender_id = new ObjectId(field.sender_id);
  }
  
  const deleteOne = await db.collection('messages').deleteOne(field);

  return deleteOne;
};