import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Form from '../../forms/components/Form';
import cardSchema from '../../users/models/cardSchema';
import { TextField } from '@mui/material';
import useForm from '../../forms/hooks/useForm.js';
import addCardObj from '../../users/helpers/initialForms/initialCardForm.js';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function EditCardPage() {
    const {
        errors,
        handleReset,
        validateForm,
        onSubmit,
        data,

    } = useForm(addCardObj, cardSchema, () => { });

    const [fieldData, setFieldData] = useState({});

    const location = useLocation();
    const cardId = location.state?.cardId || '';

    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    useEffect(() => {
        fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((result) => {
                // Update fieldData to match the structure of the response
                setFieldData({
                    title: result.title,
                    subtitle: result.subtitle,
                    description: result.description,
                    phone: result.phone,
                    email: result.email,
                    webUrl: result.web, // Update to match response structure
                    imageUrl: result.image.url, // Update to match response structure
                    imageAlt: result.image.alt, // Update to match response structure
                    state: result.address.state,
                    country: result.address.country,
                    city: result.address.city,
                    street: result.address.street,
                    houseNumber: result.address.houseNumber,
                    zip: result.address.zip
                });
                console.log(result);
            })
            .catch((error) => console.error('There was a problem with the fetch operation:', error));
    }, [cardId]);

    const fields = [
        { name: 'title', label: 'Title', required: true },
        { name: 'subtitle', label: 'Subtitle', required: true },
        { name: 'description', label: 'Description', required: true },
        { name: 'phone', label: 'Phone', required: true },
        { name: 'email', label: 'Email', required: true },
        { name: 'webUrl', label: 'Website', required: false },
        { name: 'imageUrl', label: 'Image URL', required: false },
        { name: 'imageAlt', label: 'Image Alt', required: false },
        { name: 'state', label: 'State', required: false },
        { name: 'country', label: 'Country', required: true },
        { name: 'city', label: 'City', required: true },
        { name: 'street', label: 'Street', required: true },
        { name: 'houseNumber', label: 'House Number', required: true },
        { name: 'zip', label: 'ZIP Code', required: true },
    ];

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFieldData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        let token = localStorage.getItem('my token');
        try {
            const myHeaders = new Headers();
            myHeaders.append("x-auth-token", token);
            myHeaders.append("Content-Type", "application/json");

            const convertedObjectToTheServer = JSON.stringify({
                "title": fieldData.title,
                "subtitle": fieldData.subtitle,
                "description": fieldData.description,
                "phone": fieldData.phone,
                "email": fieldData.email,
                "web": fieldData.webUrl, // Update to match request structure
                "image": {
                    "url": fieldData.imageUrl, // Update to match request structure
                    "alt": fieldData.imageAlt // Update to match request structure
                },
                "address": {
                    "state": fieldData.state,
                    "country": fieldData.country,
                    "city": fieldData.city,
                    "street": fieldData.street,
                    "houseNumber": fieldData.houseNumber,
                    "zip": fieldData.zip
                }
            });

            console.log("Sending data:", convertedObjectToTheServer); // Log data being sent

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: convertedObjectToTheServer,
                redirect: "follow"
            };

            fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", requestOptions)
                .then((response) => {
                    console.log("Response status:", response.status); // Log response status
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then((result) => {
                    console.log("Submit result:", result); // Log result of submit
                })
                .catch((error) => console.error('There was a problem with the fetch operation:', error));

        } catch (error) {
            console.log('Submit error:', error); // Log errors in submit process
        }
    };
    const handleReset1 = () => {
        setFieldData({})
    }

    return (
        <Form
            onSubmit={handleSubmit}
            onReset={handleReset1}
            validateForm={validateForm}
        >
            <Typography variant="h4" align="center" gutterBottom>
                EDIT CARD
            </Typography>
            <Grid container spacing={2} justifyContent="center">
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
                            onChange={handleFieldChange}
                            value={fieldData[field.name] || ""}
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