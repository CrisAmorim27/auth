import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { prisma } from '../../../lib/prisma';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if(request.method === 'POST') {
    const { username, email, password } = request.body

    if(!username || !email || !password) return response.status(500).end()

    // const emailHash = bcrypt.hashSync(email, process.env.SALT!)
    const passwordHash = bcrypt.hashSync(password, 8)

    const userAlreadyExists = await prisma.users.findFirst({
      where: {
        email
      }
    })

    if(userAlreadyExists) {
      return response.status(409).json({ error: 'email_in_use' })
    }

    prisma.users.create({
      data: {
        username,
        email,
        password: passwordHash
      }
    }).then(() => {
      return response.status(201).end()
    })
    .catch(() => {
      return response.status(500).json({ error: 'failed_on_create_user' })
    })
  }
}