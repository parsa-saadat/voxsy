import { ObjectId } from 'mongodb';
import { findOneFile } from '../../models/controllers/storage/storage.controller.js';
import {
  deleteOneUser,
  findOneUser,
  findUsers,
  updateOneUser,
} from '../../models/controllers/users/users.controller.js';

export const getUsersService = async (filter = {}) => {
  let { page = 1, limit = 10, desc, phone, username, role } = filter;

  limit = Number(limit) || 10;
  page = Number(page) || 1;

  let users = await findUsers({}, desc);

  if (phone) users = users.filter((user) => user.phone.includes(phone));
  if (username) users = users.filter((user) => user.username.includes(username));
  if (role) users = users.filter((user) => user.role === role);

  const total = users.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;

  users = users.slice(start, start + limit);

  return {
    data: users,
    total,
    totalPages,
  };
};

export const getUserService = async (id, requester) => {
  const user = await findOneUser({ _id: id });

  if (!user) throw new Error('User not found', { cause: { code: 404 } });

  if (user._id.toString() !== requester._id.toString() && requester.role !== 'admin')
    throw new Error('Access Denied', { cause: { code: 400 } });

  return user;
};

export const updateUserService = async (id, data, requester) => {
  const user = await findOneUser({ _id: id });

  if (!user) throw new Error('User not found', { cause: { code: 404 } });

  if (user._id.toString() !== requester._id.toString())
    throw new Error('Access Denied', { cause: { code: 400 } });

  let { nickname, description } = data;

  if (nickname && nickname.length > 30)
    throw new Error("nickname Length Can't Moster Of 30", { cause: { code: 403 } });

  if (description && description.length > 100)
    throw new Error("description Length Can't Moster Of 100", { cause: { code: 403 } });

  if (nickname && typeof nickname !== 'string')
    throw new Error("nickname Required To String Type", { cause: { code: 403 } });

  if (description && typeof description !== 'string')
    throw new Error("description Required To String Type", { cause: { code: 403 } });


  await updateOneUser(
    { _id: id },
    {
      nickname: nickname ?? (user.nickname || undefined),
      description: description ?? (user.description || undefined),

    },
  );

  return true;
};

export const changeProfilePictureService = async (id, data, requester) => {
  const user = await findOneUser({ _id: id });

  if (!user) throw new Error('User not found', { cause: { code: 404 } });

  if (user._id.toString() !== requester._id.toString())
    throw new Error('Access Denied', { cause: { code: 400 } });

  const { storage_id } = data

  if (storage_id && typeof storage_id !== 'string')
    throw new Error("storage_id Required To String Type", { cause: { code: 403 } });

  const file = await findOneFile({ _id: storage_id })

  if (!file)
    throw new Error('File Not Found', { cause: { code: 404 } });

  if (!file.contentType.includes('image/'))
    throw new Error('File Must Be Image', { cause: { code: 404 } });

  await updateOneUser({ _id: id }, { profile_picture: new ObjectId(storage_id) })

  return true
}

export const changeStatusService = async (id, data, requester) => {
  const user = await findOneUser({ _id: id });

  if (!user) throw new Error('User not found', { cause: { code: 404 } });

  if (user._id.toString() !== requester._id.toString())
    throw new Error('Access Denied', { cause: { code: 400 } });

  const { status } = data

  const validStatus = ['offline', 'online', 'dnd', 'sleep']

  if (!validStatus.includes(status))
    throw new Error(status + " Status Is Not Valid Choose In " + validStatus.join(',', '-'))


  await updateOneUser({ _id: id }, { status })

  return true
}

export const changeEmailService = async (id, data, requester) => {
  const user = await findOneUser({ _id: id });

  if (!user) throw new Error('User not found', { cause: { code: 404 } });

  if (user._id.toString() !== requester._id.toString())
    throw new Error('Access Denied', { cause: { code: 400 } });

  const { email } = data

  
}

export const deleteUserService = async (id, requester) => {
  const user = await findOneUser({ _id: id });

  if (user?._id.toString() !== requester?._id.toString())
    throw new Error('Access Denied', { cause: { code: 400 } });

  if (!user) throw new Error('User not found', { cause: { code: 404 } });

  await deleteOneUser({ _id: id });

  return user;
};