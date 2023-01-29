import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { prisma } from '../../../lib/prisma'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if(request.method === 'GET') {
    const { email, password } = request.query as {[key: string]: string}

    if(!email || !password) return response.status(500).end()

    const user = await prisma.users.findFirst({
      where: {
        email
      }
    })

    if(!user) {
      return response.status(404).json({ error: 'wrong_credentials' })
    }

    const passwordHash = user.password
    const isCorrectPassword = bcrypt.compareSync(password, passwordHash)

    if(isCorrectPassword) {
      return response.status(200).end()
    } else {
      return response.status(401).json({ error: 'wrong_credentials' })
    }
  }
}
