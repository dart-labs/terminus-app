import type { NextApiRequest, NextApiResponse } from 'next'
import { sequelize, User, ApiKeys } from "lib/db"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if (req.method !== 'POST') {
        res.status(405)
        return
    }

    try{
        const user = await User.create({ 
            pubkey: req.body.pubkey,
            username: req.body.username
        })
        console.log('Username saved!')
    } catch (e) {
        console.log(e)
    }

    return res.status(200).json({
        message: "User added",
        username: req.body.username,
        pubkey: req.body.pubkey
    })
}