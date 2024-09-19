import React, { useContext, useEffect, useState } from 'react'
import ModalDonation from './modals/ModalAdd'
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import Donationform from './modals/ModalEdit';
import ModalEdit from './modals/ModalEdit';

export default function EditDonation(props) {

    return (
        <>
            <ModalEdit props={props} />
        </>
    )
}
