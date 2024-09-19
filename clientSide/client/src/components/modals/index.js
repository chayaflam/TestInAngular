



export const initialValues = {
    nameEntity: "",
    donationAmount:"",
    typeEntity: "",
    conditions: "",
    destination: "",
    currency: "",
    conversionRate: ""
}
export const foreignPoliticalEntity = [
    {
        value: 'מדינה זרה',
        label: 'מדינה זרה',
    },
    {
        value: 'שגרירות מדינה זרה',
        label: 'שגרירות מדינה זרה',
    },
    {
        value: 'תאגיד או מוסד בשליטת מדינה זרה',
        label: 'תאגיד או מוסד בשליטת מדינה זרה',
    },

];
export const currencies = [
    {
        value: 'דולר',
        label: '$',
    },
    {
        value: 'אירו',
        label: '€',
    },
    {
        value: 'שקל',
        label: '₪',
    }
];

export const url = "https://localhost:7265/Donation"