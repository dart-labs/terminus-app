import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from "lib/db"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405)
    }
    const query = req.query;
    const { pubkey } = query;

    await User.sync()
    let user = await User.findOne({ where: { pubkey: pubkey } })
    if (user) {
        return res.status(200).json({
            message: "Successfully looked up User in database.",
            user: user
        })
    } else {
        return res.status(404).json({
            message: "User does not exist in Users table"
        })
    }
}