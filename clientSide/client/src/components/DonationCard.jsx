import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditDonation from './EditDonation';
import { GlobalContext } from '../context/GlobalContext';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
const url = "https://localhost:7265/Donation"

export default function DonationCard(props) {

    const { edit, setEdit } = useContext(GlobalContext);
    const { nameEntity, donationAmount, id } = props;
    async function deleteDonation() {
        try {
            const { result } = await axios.delete(url, id);
            if (!result) alert("can't delete this donation")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form >
                <Box
                    sx={{
                        display: 'grid',
                        gridAutoColumns: '1fr', gap: 1,
                        border: '1px solid black',
                        borderRadius: '5px',
                        padding: '10px',
                        margin: "10px"
                    }}
                >
                    <Box sx={{ gridColumnStart: "1", gridColumnEnd: "7", display: 'flex', flexDirection: 'row' }}>
                        <Typography variant="body1" fontWeight="bold" sx={{ marginRight: '20px', paddingLeft: "15px" }}>
                            {nameEntity}
                        </Typography>
                        <Typography variant="body1">
                            {donationAmount} ₪ ש"ח
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', borderLeft: '1px solid black', paddingLeft: '10px', gridColumn: "9", }}>

                        <button onClick={() => setEdit(true)}>
                            <EditIcon />
                        </button>
                        <DeleteIcon onClick={() => deleteDonation} />

                    </Box>
                    {!edit ? <KeyboardArrowDownOutlinedIcon sx={{ gridColumn: " 10", contain: "content" }} /> : <ExpandLessIcon sx={{ gridColumn: " 10", contain: "content" }} />}
                </Box>
                {edit &&
                    <EditDonation props={props} />}

            </form>
        </>
    );

}
