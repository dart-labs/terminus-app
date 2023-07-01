import axios from 'axios'

export async function createuser(pubkey: string, username: string) {
    try {
        const response = await axios.post('/api/addUser', {
                pubkey: pubkey,
                username: username
        })
        return response.status
        console.log(response)
    } catch (error) {
        console.error(error)
        return error
    }
}

export async function login(userKey: string){
    console.log(userKey)
    try {
        const response = await axios.get('/api/login', {
            params: {
                pubkey: userKey
            }
        })

        if (response.status === 404){
            return null
        }
        console.log(response)
        return response.data.username
    } catch (error) {
        console.error(error)
    }
}