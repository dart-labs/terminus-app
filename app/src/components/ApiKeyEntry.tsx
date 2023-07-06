import React from 'react'
import { TextField, Select, MenuItem, Button, createTheme, ThemeProvider } from '@mui/material'
import { red, purple } from '@mui/material/colors';
import { lookupUser, addUserApiKey } from '../lib/ApiHelpers'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { notify } from "../utils/notifications"


const theme = createTheme({
    components: {
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white', // Set the initial background color
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#9a18db', // Set the text color to purple
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#9a18db', // Keep the background color white on hover
                        },
                },
        },
    },
},
});

export const ApiKeyEntry: React.FC = () => {
    const [selectedValue, setSelectedValue] = React.useState('');
    const [apiKey, setApiKey] = React.useState('');

    const { connection } = useConnection()
    const { publicKey, sendTransaction } = useWallet()

    const handleProviderChange = (event) => {
        setSelectedValue(event.target.value)
    };

    const handleApiKeyChange = (event) => {
        setApiKey(event.target.value);
    }

    const addApiKey = async () => {
        const userExists = await lookupUser(publicKey.toString())
        if (userExists) {
            try {
                console.log(selectedValue)
                const response = await addUserApiKey(publicKey.toString(), selectedValue, apiKey)
                notify({ type: 'success', message: 'API Key added successfully!' })
            } catch (error) {
                notify({type: 'error', message: error})
            }
        } else {
            notify({ type: 'error', message: 'Must create account first before adding API Keys!' })

        }
    }

    return (
        <div>
            <Select
                value={selectedValue}
                onChange={handleProviderChange}
                displayEmpty
                sx={{
                    minWidth: 200,
                    backgroundColor: 'white',
                }}
            >
                <MenuItem value="">API Option</MenuItem>
                <MenuItem value="Helius">Helius</MenuItem>
                <MenuItem value="Dune Analytics">Dune Analytics</MenuItem>
                <MenuItem value="Glassnode">Glassnode</MenuItem>
                <MenuItem value="SolScan">SolScan</MenuItem>
            </Select>
            <TextField
                id="outlined-basic"
                label="API Key"
                variant="filled"
                value={apiKey}
                onChange={handleApiKeyChange}
                sx={{
                    backgroundColor: 'white', // Static background color
                }}
            />
            <ThemeProvider theme={theme}>
                <Button variant="text" onClick={addApiKey}>Add Key</Button>
            </ThemeProvider>
        </div>
    )
}   
