import { config } from 'dotenv'
import jwt from 'jsonwebtoken'

config()

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env

export const signToken = ({ _id, username, role, email, phone }) => {
  const token = jwt.sign(
    { _id, username, role, email, phone },
    JWT_SECRET || "hbfrh84b2b3u9",
    { expiresIn: JWT_EXPIRES_IN || '30d' }
  )
  return token
}

export const verifyToken = (token) => {
  const user = jwt.verify(token, JWT_SECRET || "hbfrh84b2b3u9")

  return user
}