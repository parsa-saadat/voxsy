import { insertLog } from '../../../models/controllers/logs/logs.controller.js';

export class Logger {
  static async log(level, message, data = {}) {
    return insertLog({
      level,
      message,
      user: {
        _id: data?.user?._id || undefined,
        username: data?.user?.username || undefined,
        phone: data?.user?.phone || undefined,
        role: data?.user?.role || undefined,
      },
      info: {
        url: data?.info?.url || undefined,
        ip: data?.info?.ip || undefined,
        user_agent: data?.info?.user_agent || undefined,
      },
    });
  }

  static async info(message, info) {
    return this.log('info', message, info);
  }

  static async error(message, info) {
    return this.log('error', message, info);
  }

  static async warning(message, info) {
    return this.log('warning', message, info);
  }

  static async bug(message, info) {
    return this.log('debug', message, info);
  }

  static async critical(message, info) {
    return this.log('critical', message, info);
  }

  static async system(message, info) {
    return this.log('system', message, info);
  }
}
