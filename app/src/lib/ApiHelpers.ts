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
        } else {
            console.log(response)
            return response.data.username
        }
    } catch (error) {
        console.error(error)
    }
}

export async function lookupUser(userKey: string){
    try{
        const response = await axios.get('/api/lookupUser', {
            params: {
                pubkey: userKey
            }
        })

        if (response.status === 404){
            console.log(response)
            return null
        } else {
            console.log(response)
            return response.data.user
        }
    } catch (error) {
        console.error(error)
    }
}

export async function addUserApiKey(userKey: string, provider: string, apiKey: string) {
    try {
        const response = await axios.post('/api/addApiKey', {
            pubkey: userKey,
            provider: provider,
            apiKey: apiKey
        })
        console.log(response)
        return response.status
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function getUserApiKeys(userKey: string) {
    try {
        const response = await axios.get('/api/getApiKeys', {
            params: {
                pubkey: userKey
            }
    })
    if (response.status === 404){
        console.log(response)
        return null
    } else {
        console.log(response)
        return response.data.apiKeys
    }
    } catch (error) {
        console.log(error)
        return error
    }
}