import { Fab } from '@mui/material';
import React from 'react';
import ROUTES from '../../routes/routesModel';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export default function AddNewCardButton() {
    const navigate = useNavigate();

    return (
        <Fab
            aria-label="add"
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                backgroundColor: '#ffffff',
                '&:hover': {
                    backgroundColor: '#000000',
                },
            }}
            onClick={() => navigate(ROUTES.ADD_CARD)}
        >
            <AddIcon
                sx={{
                    color: '#000000',
                    '&:hover': {
                        color: '#ffffff',
                    },
                }}
            />
        </Fab>
    );
}
