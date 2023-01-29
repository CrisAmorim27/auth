import type { NextApiRequest, NextApiResponse } from 'next'
import type { Options } from 'nodemailer/lib/mailer'
import jwt from 'jsonwebtoken'
import { transporter } from '../../../lib/nodemailer'
import { recoverPasswordMail } from '../../../utils/mails/recoverPasswordMail'
import { prisma } from '../../../lib/prisma'
import { LanguageCode, languages } from '../../../utils/languages'
import { replaceObj } from '../../../functions/replaceObj'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if(request.method === 'POST') {
    const { email, lang } = request.body

    if(!email) return response.status(500).end()

    const user = await prisma.users.findFirst({
      where: {
        email
      }
    })

    if(!user) {
      return response.status(404).json({ error: 'email_not_exists' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '24h' })
    const resetPassUri = `http://localhost:3000/forgot?token=${token}`

    const languageCode: LanguageCode = lang || 'en-us'
    const translation = await languages[languageCode].getTranslations()

    const placeholders = {
      '{username}': user.username,
      '{hello}': translation.forgotPasswordMail.hello,
      '{description}': translation.forgotPasswordMail.description,
      '{redirectText}': translation.forgotPasswordMail.redirect,
      '{resetUri}': resetPassUri,
    }

    const formattedMail = replaceObj(recoverPasswordMail, placeholders)

    const mailOptions: Options = {
      from: 'gustavorodriguesofficial@gmail.com',
      to: email,
      subject: translation.forgotPasswordMail.subject,
      html: formattedMail,
    }

    transporter.sendMail(mailOptions, (err) => {
      if(err) {
        return response.status(500).json({ error: 'failed_on_send_mail' })
      }
    })
  }

  return response.status(200).end()
}
