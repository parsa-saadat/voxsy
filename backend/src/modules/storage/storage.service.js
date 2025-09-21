import {
  deleteOneFile,
  findFiles,
  findOneFile,
  insertFile,
} from '../../models/controllers/storage.controller.js';

const { ALLOWED_MIME_TYPES, MAX_MB_UPLOAD_SIZE } = process.env

export const uploadService = async (files) => {
  if (!files || files.length < 0) throw new Error('File not found', { cause: { code: 400 } });

  let newFiles = [];

  const allowedMimeTypes = ALLOWED_MIME_TYPES.split(',') || ['image/*', 'video/*']

  for (let i = 0; i < files.length; i++) {
    const { originalname, mimetype, size, buffer } = files[i];

    if (!allowedMimeTypes.includes(mimetype))
      throw new Error('Invalid MIME Type', { cause: { code: 400 } });

    if (size > (MAX_MB_UPLOAD_SIZE || 10) * 1024 * 1024)
      throw new Error(
        `File size exceeds the maximum limit ( ${MAX_MB_UPLOAD_SIZE || 10}MB )`,
        { cause: { code: 400 } },
      );

    newFiles.push(
      await insertFile({
        name: originalname,
        contentType: mimetype,
        size: size,
        data: buffer,
      }),
    );
  }

  return newFiles;
};

export const getFilesService = async (filter) => {
  let { page, limit, contentType, search, desc } = filter;

  limit = Number(limit) || 10;
  page = Number(page) || 1;

  let files = await findFiles({}, desc);

  if (contentType) files = files.filter((file) => file.contentType.includes(contentType));

  if (search) files = files.filter((file) => file.name.includes(search));

  const start = (page - 1) * limit;
  const total = files.length;
  const totalPages = Math.ceil(total / limit);

  files = files.slice(start, page * limit);

  return {
    data: files,
    total,
    totalPages,
  };
};

export const getFileService = async (id) => {
  const file = await findOneFile({ _id: id });

  if (!file) throw new Error('File not found', { cause: { code: 404 } });

  return file;
};

export const deleteFileService = async (id) => {
  const file = await findOneFile({ _id: id });

  if (!file) throw new Error('File not found', { cause: { code: 404 } });

  await deleteOneFile({ _id: id });

  return file;
};
