import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from "lib/db"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if (req.method !== 'POST') {
        return res.status(405)
    }

    await User.sync()

    const user = await User.findOne({ where: { pubkey: req.body.pubkey as String } })
    if (user !== null) {
        console.log("User already exists")
        return res.status(400).json({message: "Cannot create User, they already exist!"})
    } else {
        try{
            const user = await User.create({ 
                pubkey: req.body.pubkey,
                username: req.body.username
            })
            console.log('Username saved!')
        } catch (e) {
            console.log(e)
            return res.status(401)
        }

        return res.status(201).json({
            message: "User added",
            username: req.body.username,
            pubkey: req.body.pubkey
        })
    }
}