import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
/**
 * Middleware which verify a token
 * @param _req http request
 * @param res http response
 * @param next a express function
 */
const token_verifier = async (
  _req: Request,
  res: Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = _req.headers.authorization
    const token = authorizationHeader?.split(' ')[1]
    jwt.verify(token as string, process.env.TOKEN_SECRET as string)
    next()
  } catch (err) {
    res.status(401)
    res.json(`Invalid token ${err}`)
  }
}
export default token_verifier
