import React from 'react'
import { TextField, Select, MenuItem, Button, createTheme, ThemeProvider } from '@mui/material'
import { red, purple } from '@mui/material/colors';

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

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            <Select
                value={selectedValue}
                onChange={handleChange}
                displayEmpty
                sx={{
                    minWidth: 200,
                    backgroundColor: 'white',
                }}
            >
                <MenuItem value="">API Option</MenuItem>
                <MenuItem value="">Helius</MenuItem>
                <MenuItem value="">Dune Analytics</MenuItem>
                <MenuItem value="">Glassnode</MenuItem>
                <MenuItem value="">SolScan</MenuItem>
            </Select>
            <TextField
                id="outlined-basic"
                label="API Key"
                variant="filled"
                sx={{
                    backgroundColor: 'white', // Static background color
                }}
            />
            <ThemeProvider theme={theme}>
                <Button variant="text">Add Key</Button>
            </ThemeProvider>
        </div>
    )
}   
