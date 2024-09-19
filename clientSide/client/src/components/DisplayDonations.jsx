import React, { useEffect, useState } from 'react'
import DonationCard from './DonationCard'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ModalEdit from './modals/ModalEdit'


const url = "https://localhost:7265/donation"

const fakeDonations = [{
    nameEntity: "ישות 1",
    donationAmount: "100",
    typeEntity: "מדינה זרה",
    conditions: "עמותה למען הילד",
    destination: "מוסדות לימוד",
    currency: "דולר",
    conversionRate: "3.4"
},
{
    nameEntity: "ישות 2",
    donationAmount: "200",
    typeEntity: "מדינה זרה",
    conditions: "קבלת מס",
    destination: "תיקון אפליות מגזריות",
    currency: "דולר",
    conversionRate: "3.4"
},
]

export default function DisplayDonations() {

    const [donations, setDonations] = useState(fakeDonations)

    async function getRequest() {
        // try {
        //     const {result} = await axios.get(url);
        //       console.log(result)
        //       //setDonations(result)
        // } catch (error) {
        //     console.log(error);
        // }
    }

    useEffect(() => {
        getRequest()
    }, [])

    return (
        <div dir='rtl'>
            <div>{donations && donations?.map((donation, key) => (
                <>
                    <DonationCard key={key} {...donation} />
                </>
            )
            )}</div>
            <div dir='rtl'>
                <Link to={"addDonation"}>
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        הוספת תרומה
                    </button>
                </Link>
            </div>
        </div>
    )
}
