import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import jwt, { JwtPayload } from 'jsonwebtoken'

type JwtDecodedData = JwtPayload & { email: string, id: number };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if(request.method === 'GET') {
    const { token } = request.query as {[key: string]: string}

    if(!token) return response.status(500).end()

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!)
      
      const { id, email } = decoded as JwtDecodedData

      const userExists = await prisma.users.findFirst({
        where: {
          id,
          email
        }
      })

      if(userExists) {
        return response.status(200).json({
          user: { id },
        })
      }
    } catch {
      return response.status(401).json({ error: 'failed_on_check_token' })
    }
  }
}
