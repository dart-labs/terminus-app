import React, { FC, Component, useEffect, useRef, useContext } from 'react'
import $ from 'jquery'
import 'jquery.terminal'
import 'jquery.terminal/js/jquery.terminal.min'
import 'jquery.terminal/css/jquery.terminal.min.css'
import { PublicKey, Keypair, SystemProgram, Transaction, Connection } from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore'
import { useNetworkConfiguration } from '../contexts/NetworkConfigurationProvider'
import { createuser, login } from 'lib/ApiHelpers'

function color(name: string, string: string): string {
    const colors: Record<string, string> = {
        blue: '#55f',
        green: '#4d4',
        grey: '#999',
        red: '#A00',
        yellow: '#FF5',
        violet: '#a320ce',
        white: '#fff',
    };

    if (colors[name]) {
        return `[[;${colors[name]};]${string}]`;
    } else {
        return string;
    }
}

const GREETINGS = `
________________________________    _____  .___ _______   ____ ___  _________
\\__    ___/\\_   _____/\\______   \\  /     \\ |   |\\      \\ |    |   \\/   _____/
  |    |    |    __)_  |       _/ /  \\ /  \\|   |/   |   \\|    |   /\\_____  \\ 
  |    |    |        \\ |    |   \\/    Y    \\   /    |    \\    |  / /        \\
  |____|   /_______  / |____|_  /\\____|__  /___\\____|__  /______/ /_______  /
                   \\/         \\/         \\/            \\/                 \\/
`

let walletPubkey: PublicKey
let userConnection: Connection
let username: string = 'guest'
let userNetwork

export const Terminal: FC = () => {
    const terminalRef = useRef<HTMLDivElement>(null);

    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const { getUserSOLBalance } = useUserSOLBalanceStore();
    const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();

    useEffect(() => {
        console.log("Updating state...")

        walletPubkey = publicKey
        userConnection = connection
        userNetwork = networkConfiguration
        console.log("Network config: "+networkConfiguration)
        console.log("User network config: "+userNetwork)
    
        const terminal = ($(terminalRef.current!) as any);

        terminal.terminal({
            function(command: string) {
            // Terminal command handler
            terminal.echo('You entered: ' + command);
            },
            create_account: async function(proposedUsername: string){
                if(!walletPubkey){
                    this.echo('Wallet not detected. Please connect wallet to login.')
                } else {
                    let response = await createuser(walletPubkey.toString(), proposedUsername)
                    switch(response){
                        case 201:
                            username = proposedUsername
                            this.echo(`Username successfully created! Welcome ${proposedUsername}!`)
                        case 400:
                            this.echo('Username already taken... sorry.')
                        default:
                            this.echo(response.toString())
                    }
                }
            },
            login: async function() {
                if(!walletPubkey){
                    this.echo('Wallet not detected. Please connect wallet to login.')
                } else {
                    let user = await login(walletPubkey.toString())
                    if(user) {
                        username = user
                        this.echo(`Login successful! Welcome ${user}.`)
                    } else {
                        this.echo('Wallet not associated with existing account. Please create one with the following command:')
                        this.echo('create_account <desired username>')
                    }
                }
            },
            logout: function() {
                username = 'guest'
                this.echo("Successfully logged out.")
            },
            whoami: function() {
                this.echo(username)
            },
            hello: function(input: string) {
            this.echo('Hello, ' + input + '. Welcome to this terminal.');
            },
            wallet: function() {
                if(walletPubkey) {
                    this.echo('Wallet connected.')
                    this.echo('Address: '+walletPubkey)
                    this.echo('RPC Endpoint: '+userConnection.rpcEndpoint)
                } else {
                    this.echo('Wallet not connnected. Please connect wallet.')
                }
            },
            network: function() {
                    if (!walletPubkey) {
                        this.echo('Wallet is not connected. Please connect wallet.');
                    } else {
                        this.echo('Network: ' + userNetwork);
                    }
                },
            update: function(arg1, arg2) {
                if (arg1 == 'network') {
                    setNetworkConfiguration(arg2)
                    this.echo('Network updated.')
                }
            }
        },
        {
            greetings: "Welcome to Terminus",
            prompt() {
            return `${color('violet', username+'@terminus')}>`;
            }
        }
        );
    
        return () => {
            ($(terminalRef.current!) as any);
        };
    }, [publicKey, connection, getUserSOLBalance, networkConfiguration, username]);

    return <div ref={terminalRef} className="rounded-xl container"></div>;
};