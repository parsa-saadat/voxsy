import db from '../../../configs/mongodb.config.js';

import { ObjectId } from 'mongodb';

// insert

export const insertChat = async (data) => {
  const insert = await db.collection('chats').insertOne({
    ...data,
    create_at: new Date(),
    update_at: new Date(),
  });

  const insertDocument = await db.collection('chats').findOne({
    _id: insert.insertedId,
  });

  return insertDocument
};

// update

export const updateChats = async (field, data) => {
  if (field?._id) {
    field._id = new ObjectId(field._id);
  }

  const update = await db.collection('chats').updateOne(field, {
    $set: {
      ...data,
      update_at: new Date(),
    },
  });

  return update;
};

export const updateOneChat = async (field, data) => {
  if (field?._id) {
    field._id = new ObjectId(field._id);
  }

  const update = await db.collection('chats').updateOne(field, {
    $set: {
      ...data,
      update_at: new Date(),
    },
  });

  const updateDocument = await db.collection('chats').findOne(field);

  return updateDocument;
};

// find

export const findChats = async (field, desc) => {
  if (field?._id) {
    field._id = new ObjectId(field._id);
  }

  if (desc) return await db.collection('chats').find(field).sort({ _id: -1 }).toArray();
  return await db.collection('chats').find(field).toArray();
};

export const findOneChat = async (field) => {
  if (field?._id) {
    field._id = new ObjectId(field._id);
  }

  const find = await db.collection('chats').findOne(field);
  return find;
};

// delete

export const deleteOneChat = async (field) => {
  if (field?._id) {
    field._id = new ObjectId(field._id);
  }
  
  const deleteOne = await db.collection('chats').deleteOne(field);

  return deleteOne;
};