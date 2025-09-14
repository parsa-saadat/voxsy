import db from '../../../configs/mongodb.config.js';

export const insertLog = async (field) => {
  const insert = await db.collection('logs').insertOne({ ...field, create_at: new Date() });
  return insert;
};

export const findLogs = async (field, desc) => {
  if (desc)
    return await db
      .collection('logs')
      .find({ ...field })
      .sort({ _id: -1 })
      .toArray();

  return await db
    .collection('logs')
    .find({ ...field })
    .toArray();
};
