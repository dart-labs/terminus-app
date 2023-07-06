import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiKeys } from "lib/db"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405)
    }
    const query = req.query;
    const { pubkey } = query;

    await ApiKeys.sync()

    let apiKeys = await ApiKeys.findAll({ 
        attributes: ['id', 'pubkey', 'provider', 'apikey'],
        where: { pubkey: pubkey } 
    })

    if (apiKeys) {
        return res.status(200).json({
            message: "Successfully looked up user API keys!",
            apiKeys: apiKeys
        })
    } else {
        return res.status(404).json({
            message: "User does not have any API keys saved."
        })
    }
}