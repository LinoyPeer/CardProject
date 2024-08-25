import { Fab } from '@mui/material'
import React from 'react'
import ROUTES from '../../routes/routesModel'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export default function AddNewCardButton() {
    const navigate = useNavigate();

    return (
        <>
            <Fab
                aria-label="add"
                style={{
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px',
                }}
            >
                <AddIcon
                    sx={{
                        color: '#000000',
                        '&:hover': {
                            color: '#ffffff',
                        },
                    }}
                    onClick={() => navigate(ROUTES.ADD_CARD)}
                />
            </Fab>
        </>)
}
