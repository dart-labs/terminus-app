import * as solana from '@solana/web3.js'

type TransferParams = {
    fromPubkey: solana.PublicKey;
    lamports: number | bigint;
    toPubkey: solana.PublicKey;
}

export async function sendLamportsTx(amount: number, from: solana.PublicKey, dest: string, connection: solana.Connection, latestBlockhash: solana.Blockhash) {
    let destPubkey = new solana.PublicKey(dest)
    let transferParams: TransferParams = {
        fromPubkey: from,
        toPubkey: destPubkey,
        lamports: amount
    }

    const ix = [solana.SystemProgram.transfer(transferParams)]

    const messageLegacy = new solana.TransactionMessage({
        payerKey: from,
        recentBlockhash: latestBlockhash,
        instructions: ix,
    }).compileToLegacyMessage()

    return new solana.VersionedTransaction(messageLegacy)
}