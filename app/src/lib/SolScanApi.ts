import axios from 'axios'
import { SolScanChainInformation } from './state'

const solScanBaseUrl = 'https://public-api.solscan.io'

// should require user to provide/generate their own api key eventually
const config = {
    headers:{
        accept: '*/*',
        token: process.env.NEXT_PUBLIC_SOLSCAN_KEY
    }
}

export async function chainInfo(){
    console.log("Fetching chain info...")

    try {
        const response = await axios.get(solScanBaseUrl+'/chaininfo', config)
        if (response.status === 200){
            console.log(response.data)
            return response.data
        } 
    } catch (error) {
        console.log(error)
        return error
    }
}