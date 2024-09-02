// import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Form from '../../forms/components/Form';
import cardSchema from '../../users/models/cardSchema';
import { TextField } from '@mui/material';
import useForm from '../../forms/hooks/useForm.js';
import addCardObj from '../../users/helpers/initialForms/initialCardForm.js';
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import useCards from '../hooks/useCards.js';
import { useEffect, useState } from 'react';




export default function EditCardPage() {
    const {
        data,
        errors,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
    } = useForm(addCardObj, cardSchema, () => { });
    const { getCardById } = useCards();

    const [feildData, setFeildData] = useState({});

    const fields = [
        { name: 'title', label: 'Title', required: true, required: true, defaultValue: feildData.title },
        { name: 'subtitle', label: 'Subtitle', required: true, defaultValue: "hi" },
        { name: 'description', label: 'Description', required: true, defaultValue: "hi" },
        { name: 'phone', label: 'Phone', required: true, defaultValue: "hi" },
        { name: 'email', label: 'Email', required: true, defaultValue: "hi" },
        { name: 'webUrl', label: 'Website', required: false, defaultValue: "hi" },
        { name: 'imageUrl', label: 'Image URL', required: false, defaultValue: "hi" },
        { name: 'imageAlt', label: 'Image Alt', required: false, defaultValue: "hi" },
        { name: 'state', label: 'State', required: false, defaultValue: "hi" },
        { name: 'country', label: 'Country', required: true, defaultValue: "hi" },
        { name: 'city', label: 'City', required: true, defaultValue: "hi" },
        { name: 'street', label: 'Street', required: true, defaultValue: "hi" },
        { name: 'houseNumber', label: 'House Number', required: true, defaultValue: "hi" },
        { name: 'zip', label: 'ZIP Code', required: true, defaultValue: "hi" },
    ];

    // const [initialFormData, setInitialFormData] = useState(fields.map((item) => item.value));

    const location = useLocation();
    const cardId = location.state?.cardId || {}
    const requestOptions = {
        method: "GET",
        redirect: "follow",

    };
    useEffect(() => {
        fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setFeildData(result);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (feildData != undefined) {
            console.log(feildData);
        }
    }, [feildData]);

    console.log(feildData);




    return (
        <Form
            onSubmit={() => {
                let token = localStorage.getItem('my token');
                try {
                    const myHeaders = new Headers();
                    myHeaders.append("x-auth-token", token);
                    myHeaders.append("Content-Type", "application/json");

                    const convertedObjectToTheServer = JSON.stringify({
                        "title": data.title,
                        "subtitle": data.subtitle,
                        "description": data.description,
                        "phone": data.phone,
                        "email": data.email,
                        "web": data.webUrl,
                        "image": {
                            "url": data.imageUrl,
                            "alt": data.altUrl
                        },
                        "address": {
                            "state": data.state,
                            "country": data.country,
                            "city": data.city,
                            "street": data.street,
                            "houseNumber": data.houseNumber,
                            "zip": data.zip
                        }
                    });


                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: convertedObjectToTheServer,
                        redirect: "follow"
                    };

                    fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", requestOptions)
                        .then((response) => response.text())
                        .then((result) => console.log(result))
                        .catch((error) => console.error(error));

                } catch (error) {
                    console.log(error);
                }

            }}
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
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            onChange={handleChange}
                            // value={field.value || ""}
                            defaultValue={field.defaultValue}
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
