import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from "lib/db"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === 'GET'){
        await User.sync()

        const query = req.query;
        const { pubkey } = query;

        try {
            const user = await User.findOne({ where: {pubkey: pubkey} })
            if(user===null){
                return res.status(404).json({message: "Cannot login, user does not have account."})
            } else {
                return res.status(200).json({
                    message: "Successfully logged in!",
                    username: user.username
                })
            }
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: e})
        }
    } else {
        return res.status(405).json({message: "Endpoint only accepts GET requests but received a POST request"})
    }
}