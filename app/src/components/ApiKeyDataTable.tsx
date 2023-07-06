import React, { useState, useEffect } from 'react'
import { TextField, Button, createTheme, ThemeProvider } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { red, purple } from '@mui/material/colors';
import { getUserApiKeys } from '../lib/ApiHelpers'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { notify } from "../utils/notifications"

interface Row {
    id: number;
    pubkey: string;
    provider: string;
    apikey: string;
    createdAt: string;
    updatedAt: string;
}

const columns: GridColDef[] = [
    {
        field: 'id',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
    },
    {
        field: 'pubkey',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
    },
    {
        field: 'provider',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
    },
    {
        field: 'apikey',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
    }
];

export const ApiKeyTable: React.FC = () => {

    const [data, setData] = useState([])
    const { publicKey, sendTransaction } = useWallet()
    
    useEffect(() => {
        // fetch data from database
        getUserApiKeys(publicKey.toString())
            .then((result) => {
                setData(result);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [publicKey])

    // Render the table component only if data exists
    if (data.length === 0) {
        return <div>No API Keys to display...</div>; // Render loading state while fetching data
    }
    
    return (
    <div style={{ height: '100%', width: '100%' }}>
        <DataGrid<Row>
            rows={data} 
            columns={columns}
            sx={{
                '& .MuiDataGrid-root': {
                    backgroundColor: '#ffffff',
                },
                '& .MuiDataGrid-cell, & .MuiDataGrid-colCellTitle, & .MuiDataGrid-sortIcon': {
                    color: '#ffffff',
                },
                '.MuiDataGrid-columnSeparator': {
                    display: 'none',
                },
                '&.MuiDataGrid-root': {
                    border: 'none',
                },
                '& .super-app-theme--header': {
                    color: '#ffffff',
                },
            }}
        />
    </div>
    );
}