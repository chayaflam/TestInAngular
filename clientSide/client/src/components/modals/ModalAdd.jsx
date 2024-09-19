import React, { useState } from 'react'
import { Box, Button, Dialog, Input, TextField } from '@mui/material';
import { MenuItem } from '@mui/material';
import {url, initialValues, foreignPoliticalEntity, currencies } from "./index.js"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ModalAdd() {

    const [errName, setErrName] = useState("")
    const [errAmount, setErrAmount] = useState("")
    const [values, setValues] = useState(initialValues);
    const [open, setOpen] = useState(true)
    const navigate = useNavigate()

    function handleChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    async function handleSubmit(e) {
        try {
            console.log(values)
            e.preventDefault();
            const { result } = await axios.post(url, values);
            if (result) navigate("/donations")
            else alert("error add this donation")
        } catch (error) {
            alert("error add this donation")
        }
    }

    function handleClose() {
        setOpen(false)
        navigate("/donations")
    }

    function checkEntityNameInput(e) {
        console.log(e.target.value);
        if (/^[A-Za-z\u0590-\u05FF\s]*$/.test(e.target.value) == false) {
            setErrName("תוכן לא חוקי")
        }
        else (setErrName(""))
        handleChange(e)
    }

    function checkDonationAmount(e) {
        if (/^\d*\.?\d*$/.test(e.target.value) == false) {
            setErrAmount("תוכן לא חוקי")
        }
        else (setErrAmount(""))
        handleChange(e);
    }

    return (
        <>
            <Dialog
            sx={{ textAlign: "right" ,direction:"rtl"}}
                open={open}
                onClose={handleClose}>

                <form onSubmit={handleSubmit} >
                    <Box sx={{ dir: "rtl", boxShadow: "3", color: "white", display: 'grid', gridAutoColumns: '1fr', gap: 1, padding: "20px" ,direction:"rtl" }}>
                        <TextField sx={{ mx: "5px", gridRow: '1', gridColumn: 'span 1', textAlign: "right",direction:"rtl" }}
                            name='nameEntity'
                            required
                            id="nameEntity"
                            error={errName && "true"}
                            label={!errName ? "שם הישות המדינית הזרה" : errName}
                            onChange={
                                (e) => checkEntityNameInput(e)
                            }
                            value={values.nameEntity}
                        />
                        <TextField sx={{ mx: "5px", gridRow: '1', gridColumn: 'span 1', textAlign: "right",direction:"rtl" }}
                            name='donationAmount'
                            required
                            error={errAmount && "true"}
                            label={!errAmount ? "סכום התרומה בשח" : errAmount}
                            id="donationAmount"
                            onChange={(e) => checkDonationAmount(e)}
                            value={values.donationAmount}
                        />

                        <TextField sx={{ width: "auto", mx: "5px", gridRow: '1', gridColumn: 'span 2', textAlign: "right",direction:"rtl" }}
                            name='typeEntity'
                            id="typeEntity"
                            required
                            select
                            label="סוג הישות המדינית הזרה"
                            defaultValue={null}
                            onChange={(e) => handleChange(e)}
                            value={values.typeEntity}

                        >
                            {foreignPoliticalEntity.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField sx={{
                            mx: "5px", gridRow: '2', gridColumn: 'span 4',textAlign:"center",direction:"rtl"
                        }}
                            name='destination'
                            dir='rtl'
                            required
                            id="destination"
                            label="יעוד התרומה"
                            onChange={(e) => handleChange(e)}
                            value={values.destination}
                        />
                        <TextField sx={{ mx: "5px", gridRow: '3', gridColumn: 'span 4', textAlign: "right" ,direction:"rtl"}}
                            name='conditions'
                            id="conditions"
                            label="התנאים לתרומה"
                            onChange={(e) => handleChange(e)}
                            value={values.conditions}
                        />

                        <TextField sx={{ mx: "5px", gridRow: '4', gridColumn: 'span 1', textAlign: "right" ,direction:"rtl"}}
                            name='currency'
                            id="currency"
                            select
                            defaultValue=""
                            label="סוג המטבע"
                            onChange={(e) => handleChange(e)}
                            value={values.currency}
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField sx={{ mx: "5px", gridRow: '4', gridColumn: 'span 1', textAlign: "right" ,direction:"rtl" }}
                            name='conversionRate'
                            required
                            id="conversionRate"
                            label="שער ההמרה"
                            onChange={(e) => handleChange(e)}
                            value={values.conversionRate}
                        />
                        <Button type="submit" sx={{ mx: "5px", my: "5px", gridRow: '5', gridColumn: '4/5', borderRadius: "16px" }} variant="contained" >שמירה</Button>
                        <Button onClick={handleClose} sx={{ mx: "5px", my: "5px", gridRow: '5', gridColumn: '3/4', borderRadius: "16px" }} variant="outlined"  >ניקוי</Button>
                    </Box>
                </form >
            </Dialog>
        </>
    )
}
