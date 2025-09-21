import { readFileSync } from 'fs'

import { v4 as uuidv4 } from 'uuid';
import { hash, genSalt, compare } from 'bcrypt';
import axios from 'axios';

import { __dirname } from '../../app.js'
import {
  findOneUser,
  insertUser,
  updateOneUser,
} from '../../models/controllers/users/users.controller.js';
import { validateIRPhoneSyntax } from '../../utils/validators/phone.validator.js';
import { generateNumber } from '../../utils/generators/number.generator.js';
import { validateEmailSyntax } from '../../utils/validators/email.validator.js';
import { signToken, verifyToken } from '../../configs/token.config.js';
import { mailSender } from '../../configs/mail.config.js';

export const preService = async (data) => {
  let email = data?.email,
    phone = data?.phone,
    accept_rules = data?.accept_rules;

  if ((!phone || !email) && !accept_rules)
    throw new Error('Phone number or Email and accept rules field are required', {
      cause: { code: 400 },
    });

  if (accept_rules !== true)
    throw new Error('You must accept rules', {
      cause: { code: 400 },
    });

  if (phone && !validateIRPhoneSyntax(phone))
    throw new Error('Phone number is not valid', {
      cause: { code: 400 },
    });

  if (email && !validateEmailSyntax(email))
    throw new Error('Email is not valid', {
      cause: { code: 400 },
    });

  if (phone && phone.startsWith('09')) phone = '+98' + phone.slice(1);

  let checkUser
  email ? checkUser = await findOneUser({ email }) : null;
  phone ? checkUser = await findOneUser({ phone }) : null;

  if (!checkUser) {
    const username = "vox_" + uuidv4().slice(0, 8);
    insertUser({
      username,
      phone,
      email,
      role: 'user',
    });
  }
};

export const sendCodeService = async (data) => {
  let email = data?.email, phone = data?.phone;

  const code = generateNumber(5).toString();
  const {
    STATUS,
    KAVENEGAR_API_KEY,
    KAVENEGAR_VERIFY_TEMPLATE_NAME,
  } = process.env;


  const url = `https://api.kavenegar.com/v1/${KAVENEGAR_VERIFY_TEMPLATE_NAME}/${KAVENEGAR_API_KEY}/lookup.json`;

  const salt = await genSalt(10);
  const hashedCode = await hash(code, salt);

  if (phone && !validateIRPhoneSyntax(phone))
    throw new Error('Phone number is not valid', {
      cause: { code: 400 },
    });

  if (email && !validateEmailSyntax(email))
    throw new Error('Email is not valid', {
      cause: { code: 400 },
    });

  if (phone && phone.startsWith('09')) phone = '+98' + phone.slice(1);


  let field = {}
  phone ? field.phone = phone : null
  email ? field.email = email : null
  const user = await findOneUser(field)

  if (STATUS == 'DEV') {
    await updateOneUser(field, { verify: { code: hashedCode, date: new Date(), status: false } });
    console.log(code);
    return code;
  }

  if (phone) {
    try {
      const response = await axios.post(
        url,
        new URLSearchParams({
          receptor: phone,
          token: code,
          template: template,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      if (response.data.return.status !== 200)
        throw new Error('Code sending failed', {
          cause: { code: 500 },
        });

    } catch (e) {
      console.log(e.response);
      return e.message;
    }

    if (phone && phone.startsWith('09')) phone = '+98' + phone.slice(1);

    await updateOneUser({ phone }, { vertify: { code: hashedCode, date: new Date(), status: false } });
  } else if (email) {
    const { MAIL_HTML_AUTH_TEMPLATE_PATH, CLIENT_URL, EXPIRE_AUTH_REQUEST_MIN } = process.env

    const token = signToken(user)

    let htmlAuthTemplate = readFileSync(__dirname + (MAIL_HTML_AUTH_TEMPLATE_PATH || "/templates/auth.template.html"))

    htmlAuthTemplate = htmlAuthTemplate.toString()

    htmlAuthTemplate = htmlAuthTemplate.replace("{{name}}", user?.display_name || user.username)
    htmlAuthTemplate = htmlAuthTemplate.replace("{{verifyLink}}", CLIENT_URL + '/verify?token=' + token)
    htmlAuthTemplate = htmlAuthTemplate.replace("{{verificationCode}}", code)
    htmlAuthTemplate = htmlAuthTemplate.replace("{{expiresIn}}", EXPIRE_AUTH_REQUEST_MIN || 5)

    mailSender({ email, subject: "VOXSY || Account Verification", html: htmlAuthTemplate })

    await updateOneUser({ email }, { verify: { code: hashedCode, date: new Date(), status: false } });
  }

};

export const loginService = async (data) => {
  let email = data?.email,
    phone = data?.phone,
    code = data?.code;

  if (!code || (!phone && !email))
    throw new Error('Phone or Email number and code are required', {
      cause: { code: 400 },
    });

  if (phone && !validateIRPhoneSyntax(phone))
    throw new Error('Phone number is not valid', {
      cause: { code: 400 },
    });

  if (email && !validateEmailSyntax(email))
    throw new Error('Email is not valid', {
      cause: { code: 400 },
    });

  if (phone && phone.startsWith('09')) phone = '+98' + phone.slice(1);

  let user
  email ? user = await findOneUser({ email }) : null;
  phone ? user = await findOneUser({ phone }) : null;
  if (!user) throw new Error('User not found', { cause: { code: 404 } });

  const { verify } = user;

  if (!verify.code) throw new Error('Missing send sms request', { cause: { code: 400 } });
  if (verify.status)
    throw new Error('You Verifyed, Send New Auth Request', { cause: { code: 400 } });

  const { code: hashedCode, date } = verify;
  const { EXPIRE_AUTH_REQUEST_MIN } = process.env

  if ((Date.now() - date) > (1000 * 60 * Number(EXPIRE_AUTH_REQUEST_MIN) || 5))
    throw new Error('Code is expired', {
      cause: { code: 400 },
    });

  const isCodeValid = await compare(code.toString(), hashedCode);
  if (!isCodeValid)
    throw new Error('Code is not valid', {
      cause: { code: 400 },
    });

  const token = signToken(user)

  let field = {}
  phone ? field.phone = phone : null
  email ? field.email = email : null

  await updateOneUser(field, { verify: { code: null, date: null, status: true, last_login: new Date() } });

  return { _id: user._id, phone: user.phone, username: user.username, role: user.role, token };
};

export const validateTokenService = async (data) => {
  const { token } = data

  if (!token)
    throw new Error("Token Field Is Required", { cause: { code: 400 } })

  const user = verifyToken(token)

  return { user, token }
}
