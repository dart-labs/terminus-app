import type { NextApiRequest, NextApiResponse } from 'next'
import { sequelize, User, ApiKeys } from "lib/db"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405)
    }

    await ApiKeys.sync()
    
    try {
        const apiEntry = await ApiKeys.create({
            pubkey: req.body.pubkey,
            provider: req.body.provider,
            apikey: req.body.apiKey
        })
        console.log('Api key added!')
        return res.status(200).json({
            message: "Successfully added api key!",
            entry: apiEntry
        })
    } catch (e) {
        console.log(e)
        return res.status(401)
    }
}