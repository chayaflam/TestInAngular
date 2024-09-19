import React, { useState, useForm, useRef } from 'react'
import { Box, Button, Dialog, Input, TextField } from '@mui/material';
import { shadows } from '@mui/system';
import { MenuItem } from '@mui/material';
import { Form, Navigate, useNavigate } from 'react-router-dom';
import {url, initialValues, foreignPoliticalEntity, currencies } from "./index.js"


export default function ModalEdit({ props }) {
  console.log(props)
  const navigate = useNavigate()
  const [values, setValues] = useState(props);
  const [errName, setErrName] = useState("")
  const [errAmount, setErrAmount] = useState("")
  const [open, setOpen] = useState(true)

  function handleChange(e) {
    console.log(event.target.value);
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const { result } = await axios.put(url, values);
      if (result) handleClose()
        else alert("can't update this donation")
    } catch (error) {
      alert("can't update this donation")
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
    <Dialog
      open={open}
      onClose={handleClose}>

      <form onSubmit={handleSubmit} >
        <Box sx={{ boxShadow: "3", color: "white", display: 'grid', gridAutoColumns: '1fr', gap: 1, padding: "20px", direction: "rtl" }}>
          <Box>

          </Box>
          <TextField sx={{ mx: "5px", gridRow: '1', gridColumn: 'span 4', textAlign: "right", }}
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
          <TextField sx={{ mx: "5px", gridRow: '2', gridColumn: 'span 4', textAlign: "right", direction: "rtl" }}
            name='donationAmount'
            required
            error={errAmount && "true"}
            label={!errAmount ? "סכום התרומה בשח" : errAmount}
            id="donationAmount"
            onChange={(e) => checkDonationAmount(e)}
            value={values.donationAmount}
          />

          <TextField sx={{ width: "auto", mx: "5px", gridRow: '3', gridColumn: 'span 4', textAlign: "right", direction: "rtl" }}
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
            mx: "5px", gridRow: '4', gridColumn: 'span 4', textAlign: "right", direction: "rtl"
          }}
            name='destination'
            dir='rtl'
            required
            id="destination"
            label="יעוד התרומה"
            onChange={(e) => handleChange(e)}
            value={values.destination}
          />
          <TextField sx={{ mx: "5px", gridRow: '5', gridColumn: 'span 4', textAlign: "right", direction: "rtl" }}
            name='conditions'
            id="conditions"
            label="התנאים לתרומה"
            onChange={(e) => handleChange(e)}
            value={values.conditions}
          />

          <TextField sx={{ mx: "5px", gridRow: '6', gridColumn: 'span 4', textAlign: "right", direction: "rtl" }}
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

          <TextField sx={{ mx: "5px", gridRow: '7', gridColumn: 'span 4', textAlign: "right", direction: "rtl" }}
            name='conversionRate'
            required
            id="conversionRate"
            label="שער ההמרה"
            onChange={(e) => handleChange(e)}
            value={values.conversionRate}
          />
          <Button sx={{ mx: "5px", my: "5px", gridRow: '8', gridColumn: '4/5', borderRadius: "16px" }} variant="contained" type="submit">שמירה</Button>
          <Button onClick={handleClose} sx={{ mx: "5px", my: "5px", gridRow: '8', gridColumn: '3/4', borderRadius: "16px" }} variant="outlined"  >ניקוי</Button>
        </Box>
      </form >
    </Dialog>
  )

}


