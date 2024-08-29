import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Form from '../../forms/components/Form';
import cardSchema from '../../users/models/cardSchema';
import { TextField } from '@mui/material';
import useForm from '../../forms/hooks/useForm';
import addCardObj from '../../users/helpers/initialForms/initialCardForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EditCardPage() {
    const { id } = useParams(); // קבלת ה-ID מה-URL
    // const history = useHistory();

    const {
        data,
        errors,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
    } = useForm(addCardObj, cardSchema, () => { });



    return (
        <Form
            onSubmit={handleEditSubmit}
            onReset={handleReset}
            validateForm={validateForm}
        >
            <Typography variant="h4" align="center" gutterBottom>
                EDIT CARD
            </Typography>
            <Grid
                container spacing={2} justifyContent="center"
            >

                {fields.map((field) => (
                    <Grid
                        key={field.name}
                        item xs={12} sm={6}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <TextField
                            name={field.name}
                            label={field.label}
                            onChange={handleChange}
                            value={data[field.name] || ""}
                            required={field.required}
                            error={!!errors[field.name]}
                            helperText={errors[field.name]}
                            fullWidth
                        />
                    </Grid>
                ))}
            </Grid>
        </Form>
    );
}
