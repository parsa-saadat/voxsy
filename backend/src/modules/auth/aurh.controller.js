import { loginService, sendCodeService, validateTokenService } from './auth.service.js';

export const sendCodeController = async (req, res) => {
  try {
    const code = await sendCodeService(req.body);
    res.status(200).json({
      body: code || null,
      status: 200,
      message: 'Code sent successfully',
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

export const loginController = async (req, res) => {
  try {
    const token = await loginService(req.body);
    res.status(200).json({
      body: token,
      status: 200,
      message: 'Login successfully',
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

export const validateTokenController = async (req, res) => {
  try {
    const data = await validateTokenService(req.body);
    res.status(200).json({
      body: data,
      status: 200,
      message: 'Token Validated successfully',
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
