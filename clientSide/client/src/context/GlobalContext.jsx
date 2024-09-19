import React, { createContext, useState } from 'react'

export const GlobalContext = createContext();

function GlobalProvider({ children }) {

    const [open, setOpen] = useState()
    const [edit, setEdit] = useState()
    const [isAuth, setIsAuth] = useState();

    const value = {
        open,
        setOpen,
        edit,
        setEdit,
        isAuth, 
        setIsAuth
    };
    return (
        <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    );
}

export default GlobalProvider;
