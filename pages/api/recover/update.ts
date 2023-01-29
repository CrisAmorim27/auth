import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import bcrypt from 'bcrypt'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if(request.method === 'PATCH') {
    const { password, user } = request.body

    if(!password) return response.status(500).end()

    const passwordHash = bcrypt.hashSync(password, 8)

    prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: passwordHash
      }
    })
      .then(() => {
        return response.status(200).end()
      })
      .catch(() => {
        return response.status(400).json({ error: 'failed_on_update_password' })
      })
  }
}
